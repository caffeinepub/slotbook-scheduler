import List "mo:core/List";
import AvailabilityTypes "types/availability";
import BookingTypes "types/booking";
import AvailabilityLib "lib/availability";
import AvailabilityApiMixin "mixins/availability-api";
import BookingApiMixin "mixins/booking-api";
import AdminApiMixin "mixins/admin-api";

actor {
  let rules = List.empty<AvailabilityTypes.AvailabilityRule>();
  let blockedDates = List.empty<AvailabilityTypes.BlockedDate>();
  let bookings = List.empty<BookingTypes.Booking>();

  // Seed default availability on first deployment only (when no rules exist yet)
  if (rules.size() == 0) {
    let meetingTypes : [AvailabilityTypes.MeetingType] = [#online, #physical];
    var dow = 1;
    label seedLoop while (dow <= 5) {
      let rule = AvailabilityLib.makeRule(dow, "09:00", "17:00", 30, meetingTypes);
      AvailabilityLib.addRule(rules, rule);
      dow := dow + 1;
    };
  };

  include AdminApiMixin();
  include AvailabilityApiMixin(_getAdminPrincipal, rules, blockedDates);
  include BookingApiMixin(_getAdminPrincipal, bookings, rules, blockedDates);
};
