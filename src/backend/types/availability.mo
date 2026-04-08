import CommonTypes "common";

module {
  public type Timestamp = CommonTypes.Timestamp;

  public type MeetingType = {
    #online;
    #physical;
  };

  public type TimeSlot = {
    startTime : Text;
    endTime : Text;
  };

  public type AvailabilityRule = {
    id : Text;
    dayOfWeek : Nat;
    startTime : Text;
    endTime : Text;
    slotDurationMinutes : Nat;
    meetingTypes : [MeetingType];
  };

  public type BlockedDate = {
    id : Text;
    date : Text;
    reason : ?Text;
  };
};
