import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AvailabilityTypes "../types/availability";
import AvailabilityLib "../lib/availability";

mixin (
  getAdminPrincipal : () -> Principal,
  autoInitAdmin : Principal -> (),
  rules : List.List<AvailabilityTypes.AvailabilityRule>,
  blockedDates : List.List<AvailabilityTypes.BlockedDate>,
) {
  func requireAdminAvailability(caller : Principal) {
    // Auto-initialize admin on first call if still anonymous
    autoInitAdmin(caller);
    if (not Principal.equal(caller, getAdminPrincipal())) {
      Runtime.trap("Unauthorized: admin only");
    };
  };

  // Admin: add availability rule
  public shared ({ caller }) func addAvailabilityRule(
    dayOfWeek : Nat,
    startTime : Text,
    endTime : Text,
    slotDurationMinutes : Nat,
    meetingTypes : [AvailabilityTypes.MeetingType],
  ) : async AvailabilityTypes.AvailabilityRule {
    requireAdminAvailability(caller);
    let rule = AvailabilityLib.makeRule(dayOfWeek, startTime, endTime, slotDurationMinutes, meetingTypes);
    AvailabilityLib.addRule(rules, rule);
    rule
  };

  public shared ({ caller }) func removeAvailabilityRule(ruleId : Text) : async Bool {
    requireAdminAvailability(caller);
    let sizeBefore = rules.size();
    AvailabilityLib.removeRule(rules, ruleId);
    rules.size() < sizeBefore
  };

  public query func listAvailabilityRules() : async [AvailabilityTypes.AvailabilityRule] {
    AvailabilityLib.listRules(rules)
  };

  // Admin: manage blocked dates
  public shared ({ caller }) func addBlockedDate(date : Text, reason : ?Text) : async AvailabilityTypes.BlockedDate {
    requireAdminAvailability(caller);
    let bd = AvailabilityLib.makeBlockedDate(date, reason);
    AvailabilityLib.addBlockedDate(blockedDates, bd);
    bd
  };

  public shared ({ caller }) func removeBlockedDate(blockedDateId : Text) : async Bool {
    requireAdminAvailability(caller);
    let sizeBefore = blockedDates.size();
    AvailabilityLib.removeBlockedDate(blockedDates, blockedDateId);
    blockedDates.size() < sizeBefore
  };

  public query func listBlockedDates() : async [AvailabilityTypes.BlockedDate] {
    AvailabilityLib.listBlockedDates(blockedDates)
  };

  // Public: query available time slots for a given date and meeting type
  public query func getAvailableSlots(date : Text, meetingType : AvailabilityTypes.MeetingType) : async [AvailabilityTypes.TimeSlot] {
    // For query, we don't have access to bookings here; returns all slots ignoring booked ones
    // Slot conflict checking happens in createBooking in booking-api
    AvailabilityLib.getAvailableSlots(rules, blockedDates, [], date, meetingType)
  };
};
