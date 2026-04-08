import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TimeSlot {
    startTime: string;
    endTime: string;
}
export interface AvailabilityRule {
    id: string;
    slotDurationMinutes: bigint;
    startTime: string;
    endTime: string;
    dayOfWeek: bigint;
    meetingTypes: Array<MeetingType>;
}
export interface Booking {
    id: string;
    status: BookingStatus;
    topic: string;
    date: string;
    createdAt: Timestamp;
    meetingType: MeetingType;
    visitorName: string;
    visitorEmail: string;
    cancelReason?: string;
    timeSlot: TimeSlot;
}
export interface BlockedDate {
    id: string;
    date: string;
    reason?: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    confirmed = "confirmed"
}
export enum MeetingType {
    physical = "physical",
    online = "online"
}
export interface backendInterface {
    addAvailabilityRule(dayOfWeek: bigint, startTime: string, endTime: string, slotDurationMinutes: bigint, meetingTypes: Array<MeetingType>): Promise<AvailabilityRule>;
    addBlockedDate(date: string, reason: string | null): Promise<BlockedDate>;
    cancelBooking(bookingId: string, reason: string | null): Promise<boolean>;
    createBooking(visitorName: string, visitorEmail: string, topic: string, date: string, timeSlot: TimeSlot, meetingType: MeetingType): Promise<Booking>;
    getAdmin(): Promise<Principal>;
    getAvailableSlots(date: string, meetingType: MeetingType): Promise<Array<TimeSlot>>;
    getBooking(bookingId: string): Promise<Booking | null>;
    initializeAdmin(): Promise<boolean>;
    isAdmin(): Promise<boolean>;
    listAvailabilityRules(): Promise<Array<AvailabilityRule>>;
    listBlockedDates(): Promise<Array<BlockedDate>>;
    listBookings(): Promise<Array<Booking>>;
    listBookingsByDate(date: string): Promise<Array<Booking>>;
    removeAvailabilityRule(ruleId: string): Promise<boolean>;
    removeBlockedDate(blockedDateId: string): Promise<boolean>;
    setAdmin(newAdmin: Principal): Promise<boolean>;
}
