import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, d as LoadingSpinner } from "./index-DWKmIeDH.js";
import { L as Label, I as Input, u as ue } from "./label-ds07RzSb.js";
import { A as AdminLayout } from "./AdminLayout-DhucEqgI.js";
import { B as Badge } from "./index-Bp53Z1Pe.js";
import { c as cn, B as Button } from "./button-DIoqyFF7.js";
import { C as Card, a as CardContent } from "./card-0U-Ji5Lr.js";
import { R as Root, C as Content, a as Close, T as Title, P as Portal, O as Overlay } from "./index-Bpqm5zo9.js";
import { b as useAdminBookings, c as useCancelBooking } from "./useBackend-DMjBFmXG.js";
import { C as Calendar, b as Monitor, M as MapPin, a as Clock } from "./monitor-B-AvcyRD.js";
import { C as CircleCheck } from "./circle-check-Aim_yAeF.js";
import { C as CircleX } from "./circle-x-CATMqqRy.js";
import { M as Mail } from "./mail-B4CVu2ep.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const FILTER_TABS = [
  { id: "upcoming", label: "Upcoming" },
  { id: "today", label: "Today" },
  { id: "all", label: "All" },
  { id: "cancelled", label: "Cancelled" }
];
function AdminBookingsPage() {
  const { data: bookings = [], isLoading } = useAdminBookings();
  const cancelBooking = useCancelBooking();
  const [activeTab, setActiveTab] = reactExports.useState("upcoming");
  const [cancelDialogId, setCancelDialogId] = reactExports.useState(null);
  const [cancelReason, setCancelReason] = reactExports.useState("");
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const filtered = bookings.filter((b) => {
    switch (activeTab) {
      case "upcoming":
        return b.status === "confirmed" && b.date >= today;
      case "today":
        return b.status === "confirmed" && b.date === today;
      case "cancelled":
        return b.status === "cancelled";
      default:
        return true;
    }
  }).sort((a, b) => {
    if (activeTab === "upcoming" || activeTab === "today") {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.timeSlot.startTime.localeCompare(b.timeSlot.startTime);
    }
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return b.timeSlot.startTime.localeCompare(a.timeSlot.startTime);
  });
  const tabCounts = {
    upcoming: bookings.filter(
      (b) => b.status === "confirmed" && b.date >= today
    ).length,
    today: bookings.filter((b) => b.status === "confirmed" && b.date === today).length,
    all: bookings.length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length
  };
  const handleCancel = async () => {
    if (!cancelDialogId) return;
    try {
      await cancelBooking.mutateAsync({
        id: cancelDialogId,
        reason: cancelReason.trim() || void 0
      });
      ue.success("Booking cancelled successfully");
      setCancelDialogId(null);
      setCancelReason("");
    } catch {
      ue.error("Could not cancel booking. Please try again.");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { message: "Loading bookings…" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          "Manage all meeting bookings — ",
          filtered.length,
          " result",
          filtered.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center gap-1 p-1 bg-muted rounded-lg w-fit",
          role: "tablist",
          "aria-label": "Filter bookings",
          "data-ocid": "bookings-filter-tabs",
          children: FILTER_TABS.map(({ id, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": activeTab === id,
              onClick: () => setActiveTab(id),
              "data-ocid": `filter-tab-${id}`,
              className: `relative px-4 py-1.5 rounded-md text-sm font-medium transition-smooth flex items-center gap-1.5 ${activeTab === id ? "bg-card text-foreground shadow-subtle" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                label,
                tabCounts[id] > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs rounded-full px-1.5 py-0.5 leading-none ${activeTab === id ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"}`,
                    children: tabCounts[id]
                  }
                )
              ]
            },
            id
          ))
        }
      ),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tab: activeTab }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "bookings-list", children: filtered.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        BookingCard,
        {
          booking,
          onCancel: () => {
            setCancelDialogId(booking.id);
            setCancelReason("");
          }
        },
        booking.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!cancelDialogId,
        onOpenChange: (open) => {
          if (!open) {
            setCancelDialogId(null);
            setCancelReason("");
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "cancel-dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Cancel Booking" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Are you sure you want to cancel this booking? This action cannot be undone." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "cancel-reason",
                  className: "text-sm font-medium mb-1.5 block",
                  children: [
                    "Reason",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cancel-reason",
                  placeholder: "e.g. Schedule conflict, holiday…",
                  value: cancelReason,
                  onChange: (e) => setCancelReason(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") handleCancel();
                  },
                  "data-ocid": "cancel-reason-input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setCancelDialogId(null),
                "data-ocid": "cancel-dialog-dismiss",
                children: "Keep Booking"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                onClick: handleCancel,
                disabled: cancelBooking.isPending,
                "data-ocid": "cancel-dialog-confirm",
                children: cancelBooking.isPending ? "Cancelling…" : "Cancel Booking"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function EmptyState({ tab }) {
  const messages = {
    upcoming: {
      title: "No upcoming meetings",
      desc: "Confirmed meetings scheduled after today will appear here."
    },
    today: {
      title: "No meetings today",
      desc: "You have a free schedule for today."
    },
    all: {
      title: "No bookings yet",
      desc: "Meetings booked through the public page will appear here."
    },
    cancelled: {
      title: "No cancelled bookings",
      desc: "Cancelled meetings will be listed here."
    }
  };
  const { title, desc } = messages[tab];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card p-16 text-center",
      "data-ocid": "bookings-empty",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: desc })
      ]
    }
  );
}
function BookingCard({
  booking: b,
  onCancel
}) {
  const formattedDate = (/* @__PURE__ */ new Date(`${b.date}T12:00:00`)).toLocaleDateString(
    "en-IN",
    { weekday: "short", year: "numeric", month: "short", day: "numeric" }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border-border shadow-subtle hover:border-primary/30 transition-smooth",
      "data-ocid": `booking-card-${b.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4 justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${b.meetingType === "online" ? "bg-primary/10" : "bg-accent/20"}`,
              children: b.meetingType === "online" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-5 w-5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-accent-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: b.visitorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: b.status === "confirmed" ? "default" : "secondary",
                  className: "text-xs capitalize",
                  "data-ocid": `booking-status-${b.id}`,
                  children: [
                    b.status === "confirmed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3 mr-1" }),
                    b.status
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs capitalize ${b.meetingType === "online" ? "border-primary/40 text-primary" : "border-accent/40 text-accent-foreground"}`,
                  "data-ocid": `booking-type-${b.id}`,
                  children: b.meetingType === "online" ? "Online" : "Physical"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-0.5 font-medium", children: b.topic }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1",
                  title: b.visitorEmail,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[200px]", children: b.visitorEmail })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 flex-shrink-0" }),
                formattedDate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 flex-shrink-0" }),
                b.timeSlot.startTime,
                " – ",
                b.timeSlot.endTime
              ] })
            ] }),
            b.cancelReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive mt-1.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3 flex-shrink-0" }),
              "Cancellation reason: ",
              b.cancelReason
            ] })
          ] })
        ] }),
        b.status === "confirmed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onCancel,
            className: "text-destructive hover:text-destructive hover:border-destructive flex-shrink-0 self-start sm:self-center",
            "data-ocid": `cancel-booking-btn-${b.id}`,
            children: "Cancel"
          }
        )
      ] }) })
    }
  );
}
export {
  AdminBookingsPage as default
};
