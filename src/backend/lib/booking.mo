import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/booking";

module {
  public type Booking = Types.Booking;
  public type CreateBookingRequest = Types.CreateBookingRequest;
  public type BookingStatus = Types.BookingStatus;
  public type TimeSlot = Types.TimeSlot;

  func generateId(prefix : Text) : Text {
    let t = Time.now();
    prefix # "-" # t.toText()
  };

  public func createBooking(
    bookings : List.List<Booking>,
    req : CreateBookingRequest,
  ) : Booking {
    let booking : Booking = {
      id = generateId("booking");
      visitorName = req.visitorName;
      visitorEmail = req.visitorEmail;
      topic = req.topic;
      date = req.date;
      timeSlot = req.timeSlot;
      meetingType = req.meetingType;
      status = #confirmed;
      cancelReason = null;
      createdAt = Time.now();
    };
    bookings.add(booking);
    booking
  };

  public func getBooking(
    bookings : List.List<Booking>,
    bookingId : Text,
  ) : ?Booking {
    bookings.find(func(b : Booking) : Bool { b.id == bookingId })
  };

  public func listBookings(bookings : List.List<Booking>) : [Booking] {
    bookings.toArray()
  };

  public func listBookingsByDate(
    bookings : List.List<Booking>,
    date : Text,
  ) : [Booking] {
    bookings.filter(func(b : Booking) : Bool { b.date == date }).toArray()
  };

  public func cancelBooking(
    bookings : List.List<Booking>,
    bookingId : Text,
    reason : ?Text,
  ) : Bool {
    var found = false;
    bookings.mapInPlace(func(b : Booking) : Booking {
      if (b.id == bookingId and b.status == #confirmed) {
        found := true;
        { b with status = #cancelled; cancelReason = reason }
      } else { b }
    });
    found
  };

  public func getBookedSlotsForDate(
    bookings : List.List<Booking>,
    date : Text,
  ) : [TimeSlot] {
    let confirmed = bookings.filter(func(b : Booking) : Bool {
      b.date == date and b.status == #confirmed
    });
    let slots = List.empty<TimeSlot>();
    confirmed.forEach(func(b : Booking) { slots.add(b.timeSlot) });
    slots.toArray()
  };
};
