import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import BookingTypes "../types/booking";
import AvailabilityTypes "../types/availability";
import BookingLib "../lib/booking";
import AvailabilityLib "../lib/availability";

mixin (
  getAdminPrincipal : () -> Principal,
  autoInitAdmin : Principal -> (),
  bookings : List.List<BookingTypes.Booking>,
  rules : List.List<AvailabilityTypes.AvailabilityRule>,
  blockedDates : List.List<AvailabilityTypes.BlockedDate>,
) {
  func requireAdminBooking(caller : Principal) {
    // Auto-initialize admin on first call if still anonymous
    autoInitAdmin(caller);
    if (not Principal.equal(caller, getAdminPrincipal())) {
      Runtime.trap("Unauthorized: admin only");
    };
  };

  // Public: create a booking (no auth required)
  public shared func createBooking(
    visitorName : Text,
    visitorEmail : Text,
    topic : Text,
    date : Text,
    timeSlot : BookingTypes.TimeSlot,
    meetingType : BookingTypes.MeetingType,
  ) : async BookingTypes.Booking {
    // Validate the requested slot is still available
    let bookedSlots = BookingLib.getBookedSlotsForDate(bookings, date);
    let availableSlots = AvailabilityLib.getAvailableSlots(rules, blockedDates, bookedSlots, date, meetingType);
    let slotAvailable = availableSlots.any(func(s : AvailabilityTypes.TimeSlot) : Bool {
      s.startTime == timeSlot.startTime and s.endTime == timeSlot.endTime
    });
    if (not slotAvailable) {
      Runtime.trap("Slot not available");
    };
    let req : BookingTypes.CreateBookingRequest = {
      visitorName;
      visitorEmail;
      topic;
      date;
      timeSlot;
      meetingType;
    };
    BookingLib.createBooking(bookings, req)
  };

  // Public: get a specific booking by ID
  public query func getBooking(bookingId : Text) : async ?BookingTypes.Booking {
    BookingLib.getBooking(bookings, bookingId)
  };

  // Admin: list all bookings
  public shared ({ caller }) func listBookings() : async [BookingTypes.Booking] {
    requireAdminBooking(caller);
    BookingLib.listBookings(bookings)
  };

  // Admin: list bookings by date
  public shared ({ caller }) func listBookingsByDate(date : Text) : async [BookingTypes.Booking] {
    requireAdminBooking(caller);
    BookingLib.listBookingsByDate(bookings, date)
  };

  // Admin: cancel a booking
  public shared ({ caller }) func cancelBooking(bookingId : Text, reason : ?Text) : async Bool {
    requireAdminBooking(caller);
    BookingLib.cancelBooking(bookings, bookingId, reason)
  };
};
