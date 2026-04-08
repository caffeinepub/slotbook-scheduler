import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { MeetingType as BackendMeetingType } from "../backend";
import type {
  AvailabilityRule,
  BlockedDate,
  Booking,
  CreateBookingRequest,
  MeetingType,
  TimeSlot,
} from "../types";

// ---------------------------------------------------------------------------
// Days lookup (exported for use in page components)
// ---------------------------------------------------------------------------

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// ---------------------------------------------------------------------------
// Type adapters — backend uses bigint; frontend types use number
// ---------------------------------------------------------------------------

function toFrontendRule(r: {
  id: string;
  dayOfWeek: bigint;
  startTime: string;
  endTime: string;
  slotDurationMinutes: bigint;
  meetingTypes: BackendMeetingType[];
}): AvailabilityRule {
  return {
    id: r.id,
    dayOfWeek: Number(r.dayOfWeek),
    startTime: r.startTime,
    endTime: r.endTime,
    slotDurationMinutes: Number(r.slotDurationMinutes),
    meetingTypes: r.meetingTypes.map((t) => t as unknown as MeetingType),
  };
}

function toFrontendBlockedDate(b: {
  id: string;
  date: string;
  reason?: string;
}): BlockedDate {
  return { id: b.id, date: b.date, reason: b.reason };
}

function toFrontendBooking(bk: {
  id: string;
  status: { cancelled: null } | { confirmed: null } | string;
  topic: string;
  date: string;
  createdAt: bigint;
  meetingType: BackendMeetingType;
  visitorName: string;
  visitorEmail: string;
  cancelReason?: string;
  timeSlot: TimeSlot;
}): Booking {
  const rawStatus = bk.status as string;
  const status =
    rawStatus === "cancelled" || rawStatus === "confirmed"
      ? (rawStatus as Booking["status"])
      : "confirmed";
  return {
    id: bk.id,
    visitorName: bk.visitorName,
    visitorEmail: bk.visitorEmail,
    topic: bk.topic,
    date: bk.date,
    timeSlot: bk.timeSlot,
    meetingType: bk.meetingType as unknown as MeetingType,
    status,
    cancelReason: bk.cancelReason,
    createdAt: Number(bk.createdAt),
  };
}

// ---------------------------------------------------------------------------
// Public booking hooks
// ---------------------------------------------------------------------------

export function useAvailableSlots(date: string, meetingType?: MeetingType) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["availableSlots", date, meetingType],
    queryFn: async (): Promise<{ startTime: string; endTime: string }[]> => {
      if (!actor || !date) return [];
      const type = (meetingType ?? "online") as unknown as BackendMeetingType;
      return actor.getAvailableSlots(date, type);
    },
    enabled: !!actor && !isFetching && !!date,
  });
}

export function useCreateBooking() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateBookingRequest): Promise<Booking> => {
      if (!actor) throw new Error("Backend not available");
      const result = await actor.createBooking(
        req.visitorName,
        req.visitorEmail,
        req.topic,
        req.date,
        req.timeSlot,
        req.meetingType as unknown as BackendMeetingType,
      );
      return toFrontendBooking(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["availableSlots"] });
      qc.invalidateQueries({ queryKey: ["adminBookings"] });
    },
    meta: { isFetching },
  });
}

// ---------------------------------------------------------------------------
// Admin hooks
// ---------------------------------------------------------------------------

export function useAdminBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["adminBookings"],
    queryFn: async (): Promise<Booking[]> => {
      if (!actor) return [];
      const results = await actor.listBookings();
      return results
        .map(toFrontendBooking)
        .sort((a, b) => b.createdAt - a.createdAt);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCancelBooking() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason?: string }) => {
      if (!actor) throw new Error("Backend not available");
      await actor.cancelBooking(id, reason ?? null);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBookings"] }),
  });
}

export function useAvailabilityRules() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["availabilityRules"],
    queryFn: async (): Promise<AvailabilityRule[]> => {
      if (!actor) return [];
      const results = await actor.listAvailabilityRules();
      return results.map(toFrontendRule);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateRule() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      rule: Omit<AvailabilityRule, "id">,
    ): Promise<AvailabilityRule> => {
      if (!actor || isFetching)
        throw new Error(
          "Backend is still connecting. Please wait a moment and try again.",
        );
      const result = await actor.addAvailabilityRule(
        BigInt(rule.dayOfWeek),
        rule.startTime,
        rule.endTime,
        BigInt(rule.slotDurationMinutes),
        rule.meetingTypes as unknown as BackendMeetingType[],
      );
      return toFrontendRule(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["availabilityRules"] }),
  });
}

export function useIsActorReady() {
  const { actor, isFetching } = useActor(createActor);
  return { isReady: !!actor && !isFetching, isFetching };
}

export function useDeleteRule() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not available");
      await actor.removeAvailabilityRule(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["availabilityRules"] }),
  });
}

export function useBlockedDates() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["blockedDates"],
    queryFn: async (): Promise<BlockedDate[]> => {
      if (!actor) return [];
      const results = await actor.listBlockedDates();
      return results.map(toFrontendBlockedDate);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBlockedDate() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<BlockedDate, "id">): Promise<BlockedDate> => {
      if (!actor) throw new Error("Backend not available");
      const result = await actor.addBlockedDate(data.date, data.reason ?? null);
      return toFrontendBlockedDate(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blockedDates"] }),
  });
}

export function useRemoveBlockedDate() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not available");
      await actor.removeBlockedDate(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blockedDates"] }),
  });
}
