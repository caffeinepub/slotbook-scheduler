export type MeetingType = "online" | "physical";

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface AvailabilityRule {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  meetingTypes: MeetingType[];
}

export interface BlockedDate {
  id: string;
  date: string;
  reason?: string;
}

export type BookingStatus = "confirmed" | "cancelled";

export interface Booking {
  id: string;
  visitorName: string;
  visitorEmail: string;
  topic: string;
  date: string;
  timeSlot: TimeSlot;
  meetingType: MeetingType;
  status: BookingStatus;
  cancelReason?: string;
  createdAt: number;
}

export interface CreateBookingRequest {
  visitorName: string;
  visitorEmail: string;
  topic: string;
  date: string;
  timeSlot: TimeSlot;
  meetingType: MeetingType;
}
