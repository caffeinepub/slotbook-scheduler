import List "mo:core/List";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Types "../types/availability";

module {
  public type AvailabilityRule = Types.AvailabilityRule;
  public type BlockedDate = Types.BlockedDate;
  public type MeetingType = Types.MeetingType;
  public type TimeSlot = Types.TimeSlot;

  // Parse "HH:MM" into total minutes since midnight
  func parseTime(t : Text) : Nat {
    let parts = t.split(#char ':');
    let arr = parts.toArray();
    if (arr.size() != 2) { return 0 };
    let h = switch (Nat.fromText(arr[0])) { case (?n) n; case null 0 };
    let m = switch (Nat.fromText(arr[1])) { case (?n) n; case null 0 };
    h * 60 + m
  };

  // Format total minutes as "HH:MM"
  func formatTime(totalMinutes : Nat) : Text {
    let h = totalMinutes / 60;
    let m = totalMinutes % 60;
    let hStr = if (h < 10) "0" # h.toText() else h.toText();
    let mStr = if (m < 10) "0" # m.toText() else m.toText();
    hStr # ":" # mStr
  };

  // Get day-of-week from "YYYY-MM-DD" as 0=Sun,1=Mon,...,6=Sat
  // Using Zeller's congruence
  func dayOfWeekFromDate(date : Text) : Nat {
    let parts = date.split(#char '-');
    let arr = parts.toArray();
    if (arr.size() != 3) { return 0 };
    let y = switch (Nat.fromText(arr[0])) { case (?n) n; case null 2024 };
    let m = switch (Nat.fromText(arr[1])) { case (?n) n; case null 1 };
    let d = switch (Nat.fromText(arr[2])) { case (?n) n; case null 1 };
    // Zeller's congruence using Int to avoid Nat underflow
    let yi : Int = y;
    let adjM : Int = if (m < 3) { m + 12 } else { m };
    let adjY : Int = if (m < 3) { yi - 1 } else { yi };
    let k : Int = adjY % 100;
    let j : Int = adjY / 100;
    let h : Int = (d + (13 * (adjM + 1)) / 5 + k + k / 4 + j / 4 + 5 * j) % 7;
    // Zeller: 0=Sat,1=Sun,...,6=Fri -> convert to 0=Sun
    Int.abs((h + 6) % 7)
  };

  // Generate a unique ID from a text seed + current time
  func generateId(seed : Text) : Text {
    let t = Time.now();
    seed # "-" # t.toText()
  };

  public func addRule(
    rules : List.List<AvailabilityRule>,
    rule : AvailabilityRule,
  ) : () {
    rules.add(rule);
  };

  public func removeRule(
    rules : List.List<AvailabilityRule>,
    ruleId : Text,
  ) : () {
    let kept = rules.filter(func(r : AvailabilityRule) : Bool { r.id != ruleId });
    rules.clear();
    rules.append(kept);
  };

  public func listRules(rules : List.List<AvailabilityRule>) : [AvailabilityRule] {
    rules.toArray()
  };

  public func addBlockedDate(
    blockedDates : List.List<BlockedDate>,
    blockedDate : BlockedDate,
  ) : () {
    blockedDates.add(blockedDate);
  };

  public func removeBlockedDate(
    blockedDates : List.List<BlockedDate>,
    blockedDateId : Text,
  ) : () {
    let kept = blockedDates.filter(func(b : BlockedDate) : Bool { b.id != blockedDateId });
    blockedDates.clear();
    blockedDates.append(kept);
  };

  public func listBlockedDates(blockedDates : List.List<BlockedDate>) : [BlockedDate] {
    blockedDates.toArray()
  };

  public func makeRule(
    dayOfWeek : Nat,
    startTime : Text,
    endTime : Text,
    slotDurationMinutes : Nat,
    meetingTypes : [MeetingType],
  ) : AvailabilityRule {
    {
      id = generateId("rule-" # dayOfWeek.toText());
      dayOfWeek;
      startTime;
      endTime;
      slotDurationMinutes;
      meetingTypes;
    }
  };

  public func makeBlockedDate(date : Text, reason : ?Text) : BlockedDate {
    { id = generateId("blocked-" # date); date; reason }
  };

  public func getAvailableSlots(
    rules : List.List<AvailabilityRule>,
    blockedDates : List.List<BlockedDate>,
    bookedSlots : [TimeSlot],
    date : Text,
    meetingType : MeetingType,
  ) : [TimeSlot] {
    // Check if date is blocked
    let isBlocked = blockedDates.any(func(b : BlockedDate) : Bool { b.date == date });
    if (isBlocked) { return [] };

    let dow = dayOfWeekFromDate(date);

    // Collect matching rules
    let matchingRules = rules.filter(func(r : AvailabilityRule) : Bool {
      if (r.dayOfWeek != dow) { return false };
      // Check if meetingType is in rule's meeting types
      r.meetingTypes.any(func(mt : MeetingType) : Bool {
        switch (mt, meetingType) {
          case (#online, #online) true;
          case (#physical, #physical) true;
          case _ false;
        }
      })
    });

    // Generate all candidate slots from matching rules
    let slots = List.empty<TimeSlot>();
    matchingRules.forEach(func(rule : AvailabilityRule) {
      let start = parseTime(rule.startTime);
      let end_ = parseTime(rule.endTime);
      var current = start;
      label slotLoop while (current + rule.slotDurationMinutes <= end_) {
        let slotStart = formatTime(current);
        let slotEnd = formatTime(current + rule.slotDurationMinutes);
        // Check if slot is already booked
        let alreadyBooked = bookedSlots.any(func(bs : TimeSlot) : Bool {
          bs.startTime == slotStart and bs.endTime == slotEnd
        });
        if (not alreadyBooked) {
          slots.add({ startTime = slotStart; endTime = slotEnd });
        };
        current := current + rule.slotDurationMinutes;
      };
    });

    slots.toArray()
  };
};
