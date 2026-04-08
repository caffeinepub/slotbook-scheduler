import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useNavigate } from "./index-z_e1rhvv.js";
import { P as PublicLayout, V as Video } from "./PublicLayout-qR0ayOd8.js";
import { P as Primitive, B as Badge } from "./index-CeDnqtV6.js";
import { c as cn, B as Button } from "./button-D-A2Aobt.js";
import { C as Card, a as CardContent } from "./card-BQvaQ4dV.js";
import { a as Calendar, C as CircleCheck, M as MapPin, b as Clock, c as Monitor } from "./monitor-b2dN5Tc0.js";
import { M as Mail } from "./mail-DLvovYpA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function ConfirmationPage() {
  const navigate = useNavigate();
  const booking = (() => {
    try {
      const raw = sessionStorage.getItem("lastBooking");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();
  if (!booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-24 text-center animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-7 w-7 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "No booking found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-sm mx-auto", children: "It looks like there's no booking to confirm. Book a meeting to get started." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => navigate({ to: "/" }),
          "data-ocid": "confirmation-back-btn",
          className: "bg-accent text-accent-foreground hover:bg-accent/90",
          children: "Book a Meeting"
        }
      )
    ] }) });
  }
  const formattedDate = (/* @__PURE__ */ new Date(`${booking.date}T12:00:00`)).toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );
  const isOnline = booking.meetingType === "online";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-4 py-14 animate-slide-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-accent flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-accent-foreground" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: "mb-4 border-primary/30 bg-primary/5 text-primary font-medium px-3 py-1 text-xs uppercase tracking-wide",
          "data-ocid": "confirmation-status-badge",
          children: "✓ Confirmed"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground mb-2", children: "Booking Confirmed!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm text-sm leading-relaxed", children: isOnline ? "Your online meeting has been booked. A meeting link will be shared with you closer to the date." : "Your in-person meeting at MaxFort School Rohini has been scheduled. We look forward to seeing you!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `px-6 py-3 flex items-center gap-3 ${isOnline ? "bg-primary/10 border-b border-primary/20" : "bg-accent/15 border-b border-accent/25"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isOnline ? "bg-primary/15" : "bg-accent/25"}`,
                children: isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Video,
                  {
                    className: `h-4 w-4 ${isOnline ? "text-primary" : "text-accent-foreground"}`
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-accent-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: booking.topic }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isOnline ? "Online Meeting" : "In-Person Meeting · MaxFort School Rohini" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs capitalize border-border flex-shrink-0",
                "data-ocid": "confirmation-meeting-type",
                children: isOnline ? "Online" : "Physical"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-6 space-y-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Visitor Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              icon: User,
              label: "Name",
              value: booking.visitorName,
              id: "confirmation-name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              icon: Mail,
              label: "Email",
              value: booking.visitorEmail,
              id: "confirmation-email"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Schedule" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              icon: Calendar,
              label: "Date",
              value: formattedDate,
              id: "confirmation-date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              icon: Clock,
              label: "Time",
              value: `${booking.timeSlot.startTime} – ${booking.timeSlot.endTime}`,
              id: "confirmation-time"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: isOnline ? "Meeting Details" : "Location" }),
          isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Online (Video Call)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5 leading-relaxed", children: [
                "A meeting link will be sent to",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: booking.visitorEmail }),
                " ",
                "before the meeting."
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 text-sm",
              "data-ocid": "confirmation-location",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-accent-foreground mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "MaxFort School, Rohini" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5 leading-relaxed", children: "Sector 9, Rohini, Delhi – 110085" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://maps.google.com/?q=MaxFort+School+Rohini+Sector+9+Delhi",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-xs text-primary hover:underline mt-1 inline-block",
                      children: "View on Google Maps →"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }),
    isOnline && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex gap-3 items-start animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-4 w-4 text-primary mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "What's next?" }),
        " Our team will send a video call link to your email at least 1 hour before the meeting time."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => navigate({ to: "/" }),
          className: "bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth flex-1 sm:flex-none sm:min-w-40",
          "data-ocid": "confirmation-new-booking-btn",
          children: "Book Another Meeting"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: () => navigate({ to: "/" }),
          className: "flex items-center gap-2 flex-1 sm:flex-none sm:min-w-32",
          "data-ocid": "confirmation-home-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to Home"
          ]
        }
      )
    ] })
  ] }) });
}
function DetailRow({
  icon: Icon,
  label,
  value,
  id
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm", "data-ocid": id, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex items-baseline gap-1.5 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        label,
        ":"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium break-words", children: value })
    ] })
  ] });
}
export {
  ConfirmationPage as default
};
