import type { backendInterface } from "../backend";
import { BookingStatus, MeetingType } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = { toText: () => "aaaaa-aa" } as unknown as Principal;

const sampleAvailabilityRules = [
  {
    id: "rule-1",
    dayOfWeek: BigInt(1),
    startTime: "09:00",
    endTime: "17:00",
    slotDurationMinutes: BigInt(30),
    meetingTypes: [MeetingType.online, MeetingType.physical],
  },
  {
    id: "rule-2",
    dayOfWeek: BigInt(2),
    startTime: "09:00",
    endTime: "17:00",
    slotDurationMinutes: BigInt(30),
    meetingTypes: [MeetingType.online, MeetingType.physical],
  },
  {
    id: "rule-3",
    dayOfWeek: BigInt(3),
    startTime: "09:00",
    endTime: "17:00",
    slotDurationMinutes: BigInt(30),
    meetingTypes: [MeetingType.online, MeetingType.physical],
  },
  {
    id: "rule-4",
    dayOfWeek: BigInt(4),
    startTime: "09:00",
    endTime: "17:00",
    slotDurationMinutes: BigInt(30),
    meetingTypes: [MeetingType.online, MeetingType.physical],
  },
  {
    id: "rule-5",
    dayOfWeek: BigInt(5),
    startTime: "09:00",
    endTime: "17:00",
    slotDurationMinutes: BigInt(30),
    meetingTypes: [MeetingType.online, MeetingType.physical],
  },
];

const sampleBookings = [
  {
    id: "booking-1",
    visitorName: "Rahul Sharma",
    visitorEmail: "rahul.sharma@example.com",
    topic: "Admission Inquiry for Class 6",
    date: "2026-04-10",
    timeSlot: { startTime: "10:00", endTime: "10:30" },
    meetingType: MeetingType.physical,
    status: BookingStatus.confirmed,
    createdAt: BigInt(1712000000000),
  },
  {
    id: "booking-2",
    visitorName: "Priya Gupta",
    visitorEmail: "priya.gupta@example.com",
    topic: "Parent Teacher Discussion",
    date: "2026-04-11",
    timeSlot: { startTime: "11:00", endTime: "11:30" },
    meetingType: MeetingType.online,
    status: BookingStatus.confirmed,
    createdAt: BigInt(1712010000000),
  },
  {
    id: "booking-3",
    visitorName: "Amit Verma",
    visitorEmail: "amit.verma@example.com",
    topic: "Fee Structure Discussion",
    date: "2026-04-08",
    timeSlot: { startTime: "14:00", endTime: "14:30" },
    meetingType: MeetingType.physical,
    status: BookingStatus.cancelled,
    createdAt: BigInt(1711990000000),
    cancelReason: "Rescheduled by visitor",
  },
];

const sampleTimeSlots = [
  { startTime: "09:00", endTime: "09:30" },
  { startTime: "09:30", endTime: "10:00" },
  { startTime: "10:00", endTime: "10:30" },
  { startTime: "10:30", endTime: "11:00" },
  { startTime: "11:00", endTime: "11:30" },
  { startTime: "11:30", endTime: "12:00" },
  { startTime: "14:00", endTime: "14:30" },
  { startTime: "14:30", endTime: "15:00" },
  { startTime: "15:00", endTime: "15:30" },
  { startTime: "15:30", endTime: "16:00" },
];

export const mockBackend: backendInterface = {
  addAvailabilityRule: async (dayOfWeek, startTime, endTime, slotDurationMinutes, meetingTypes) => ({
    id: `rule-${Date.now()}`,
    dayOfWeek,
    startTime,
    endTime,
    slotDurationMinutes,
    meetingTypes,
  }),
  addBlockedDate: async (date, reason) => ({
    id: `blocked-${Date.now()}`,
    date,
    reason: reason ?? undefined,
  }),
  cancelBooking: async () => true,
  createBooking: async (visitorName, visitorEmail, topic, date, timeSlot, meetingType) => ({
    id: `booking-${Date.now()}`,
    visitorName,
    visitorEmail,
    topic,
    date,
    timeSlot,
    meetingType,
    status: BookingStatus.confirmed,
    createdAt: BigInt(Date.now()),
  }),
  getAdmin: async () => samplePrincipal,
  getAvailableSlots: async () => sampleTimeSlots,
  getBooking: async () => sampleBookings[0],
  initializeAdmin: async () => true,
  isAdmin: async () => true,
  listAvailabilityRules: async () => sampleAvailabilityRules,
  listBlockedDates: async () => [
    { id: "blocked-1", date: "2026-04-15", reason: "School Holiday - Baisakhi" },
    { id: "blocked-2", date: "2026-04-16", reason: "Staff Training Day" },
  ],
  listBookings: async () => sampleBookings,
  listBookingsByDate: async () => sampleBookings.slice(0, 2),
  removeAvailabilityRule: async () => true,
  removeBlockedDate: async () => true,
  setAdmin: async () => true,
};
