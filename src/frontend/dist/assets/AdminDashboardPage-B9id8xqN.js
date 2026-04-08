import { c as createLucideIcon, j as jsxRuntimeExports, d as LoadingSpinner, a as Link } from "./index-z_e1rhvv.js";
import { A as AdminLayout } from "./AdminLayout-wl9aWBxu.js";
import { B as Button } from "./button-D-A2Aobt.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BQvaQ4dV.js";
import { b as useAdminBookings } from "./useBackend-BUHtnQb3.js";
import { U as Users } from "./users--D__2NxA.js";
import { C as CircleCheck, a as Calendar, b as Clock, c as Monitor, M as MapPin } from "./monitor-b2dN5Tc0.js";
import { C as CircleX } from "./circle-x--YXfWJZe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function AdminDashboardPage() {
  const { data: bookings = [], isLoading } = useAdminBookings();
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");
  const todayBookings = confirmed.filter((b) => b.date === today);
  const upcomingBookings = confirmed.filter((b) => b.date >= today).sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.timeSlot.startTime.localeCompare(b.timeSlot.startTime);
  }).slice(0, 6);
  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: Users,
      colorClass: "text-primary",
      bgClass: "bg-primary/10"
    },
    {
      label: "Confirmed",
      value: confirmed.length,
      icon: CircleCheck,
      colorClass: "text-emerald-600",
      bgClass: "bg-emerald-50"
    },
    {
      label: "Today's Meetings",
      value: todayBookings.length,
      icon: Calendar,
      colorClass: "text-accent-foreground",
      bgClass: "bg-accent/20"
    },
    {
      label: "Cancelled",
      value: cancelled.length,
      icon: CircleX,
      colorClass: "text-destructive",
      bgClass: "bg-destructive/10"
    }
  ];
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { message: "Loading dashboard…" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Overview of meeting bookings at MaxFort School Rohini" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/bookings", "data-ocid": "dashboard-view-all-btn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 mr-1.5" }),
        "All Bookings"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "stats-grid",
        children: stats.map(({ label, value, icon: Icon, colorClass, bgClass }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-foreground", children: value })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-10 w-10 rounded-lg ${bgClass} flex items-center justify-center`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${colorClass}` })
            }
          )
        ] }) }) }, label))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }),
            "Today's Meetings"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: [
            todayBookings.length,
            " meeting",
            todayBookings.length !== 1 ? "s" : ""
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: todayBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-10 text-muted-foreground",
            "data-ocid": "today-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No meetings scheduled today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 opacity-70", children: "Enjoy your free day!" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "space-y-0 divide-y divide-border",
            "data-ocid": "today-bookings-list",
            children: todayBookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardRow, { booking: b }, b.id))
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
            "Upcoming Meetings"
          ] }),
          upcomingBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/admin/bookings",
              className: "text-xs text-primary hover:underline flex items-center gap-1",
              "data-ocid": "dashboard-upcoming-more",
              children: [
                "View all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: upcomingBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-10 text-muted-foreground",
            "data-ocid": "upcoming-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No upcoming meetings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 opacity-70", children: "Bookings will appear here once confirmed" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "space-y-0 divide-y divide-border",
            "data-ocid": "upcoming-bookings-list",
            children: upcomingBookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardRow, { booking: b, showDate: true }, b.id))
          }
        ) })
      ] })
    ] }),
    bookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-6 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-medium flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
        " Meeting breakdown:"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: bookings.filter((b) => b.meetingType === "online").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Online" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-accent-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: bookings.filter((b) => b.meetingType === "physical").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Physical" })
      ] })
    ] }) }) })
  ] }) });
}
function DashboardRow({
  booking: b,
  showDate = false
}) {
  const formattedDate = (/* @__PURE__ */ new Date(`${b.date}T12:00:00`)).toLocaleDateString(
    "en-IN",
    { month: "short", day: "numeric" }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "li",
    {
      className: "flex items-center justify-between gap-3 py-2.5",
      "data-ocid": `dashboard-booking-row-${b.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0 ${b.meetingType === "online" ? "bg-primary/10" : "bg-accent/20"}`,
              children: b.meetingType === "online" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-accent-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: b.visitorName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: b.topic })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 text-right", children: [
          showDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: formattedDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: b.timeSlot.startTime })
        ] })
      ]
    }
  );
}
export {
  AdminDashboardPage as default
};
