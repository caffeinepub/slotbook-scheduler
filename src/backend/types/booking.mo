import AvailabilityTypes "availability";

module {
  public type MeetingType = AvailabilityTypes.MeetingType;
  public type TimeSlot = AvailabilityTypes.TimeSlot;
  public type Timestamp = AvailabilityTypes.Timestamp;

  public type BookingStatus = {
    #confirmed;
    #cancelled;
  };

  public type Booking = {
    id : Text;
    visitorName : Text;
    visitorEmail : Text;
    topic : Text;
    date : Text;
    timeSlot : TimeSlot;
    meetingType : MeetingType;
    status : BookingStatus;
    cancelReason : ?Text;
    createdAt : Timestamp;
  };

  public type CreateBookingRequest = {
    visitorName : Text;
    visitorEmail : Text;
    topic : Text;
    date : Text;
    timeSlot : TimeSlot;
    meetingType : MeetingType;
  };
};
