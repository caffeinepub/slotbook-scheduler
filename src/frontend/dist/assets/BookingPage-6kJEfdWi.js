import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as LoaderCircle } from "./index-DWKmIeDH.js";
import { u as ue, L as Label, I as Input } from "./label-ds07RzSb.js";
import { P as PublicLayout, V as Video } from "./PublicLayout-C0QR-TVJ.js";
import { B as Badge } from "./index-Bp53Z1Pe.js";
import { B as Button } from "./button-DIoqyFF7.js";
import { C as Card, a as CardContent } from "./card-0U-Ji5Lr.js";
import { S as Skeleton } from "./skeleton-X_xLjLO4.js";
import { u as useAvailableSlots, a as useCreateBooking } from "./useBackend-DMjBFmXG.js";
import { M as MapPin, C as Calendar, a as Clock, b as Monitor } from "./monitor-B-AvcyRD.js";
import { C as CircleCheck } from "./circle-check-Aim_yAeF.js";
import { U as Users } from "./users-DwW3ADoC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const MEETING_TOPICS = [
  "Admission Inquiry",
  "Fee Structure & Payment",
  "Academic Progress Review",
  "Disciplinary Matter",
  "Parent-Teacher Meeting",
  "Scholarship & Bursary",
  "Extra-Curricular Activities",
  "Infrastructure Query",
  "Other"
];
const STEP_LABELS = ["Choose Type", "Pick Date & Time", "Your Details"];
function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(1);
  const [meetingType, setMeetingType] = reactExports.useState("physical");
  const [selectedDate, setSelectedDate] = reactExports.useState("");
  const [selectedSlot, setSelectedSlot] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    visitorName: "",
    visitorEmail: "",
    topic: "",
    customTopic: ""
  });
  const { data: slots = [], isLoading: slotsLoading } = useAvailableSlots(
    selectedDate,
    meetingType
  );
  const createBooking = useCreateBooking();
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot || !selectedDate) return;
    const topic = form.topic === "Other" ? form.customTopic : form.topic;
    if (!topic.trim()) {
      ue.error("Please enter a meeting topic.");
      return;
    }
    try {
      const booking = await createBooking.mutateAsync({
        visitorName: form.visitorName.trim(),
        visitorEmail: form.visitorEmail.trim(),
        topic,
        date: selectedDate,
        timeSlot: selectedSlot,
        meetingType
      });
      sessionStorage.setItem("lastBooking", JSON.stringify(booking));
      navigate({ to: "/confirmation" });
    } catch {
      ue.error("Could not book meeting. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative h-48 sm:h-60 bg-primary overflow-hidden",
        style: {
          backgroundImage: `url('/assets/generated/school-hero.dim_1200x400.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/65" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full flex flex-col justify-center px-4 sm:px-8 max-w-5xl mx-auto gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary-foreground/70 text-xs font-body mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "MaxFort School, Sector 9, Rohini, Delhi" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-primary-foreground leading-tight", children: "Book a Meeting" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/75 text-sm mt-1 max-w-md", children: "Schedule time with school administration — online or in person." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-16 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-1", "aria-label": "Booking steps", children: STEP_LABELS.map((label, i) => {
      const n = i + 1;
      const isActive = step === n;
      const isDone = step > n;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold transition-smooth ${isDone ? "bg-primary text-primary-foreground" : isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
              children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }) : n
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs hidden sm:inline ${isActive ? "text-foreground font-semibold" : isDone ? "text-primary font-medium" : "text-muted-foreground"}`,
              children: label
            }
          )
        ] }),
        i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground mx-1" })
      ] }, label);
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in", children: [
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Step1,
        {
          meetingType,
          onSelect: (t) => {
            setMeetingType(t);
            setStep(2);
          }
        }
      ),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Step2,
        {
          selectedDate,
          onDateChange: (d) => {
            setSelectedDate(d);
            setSelectedSlot(null);
          },
          today,
          slots,
          slotsLoading,
          selectedSlot,
          onSlotSelect: setSelectedSlot,
          onBack: () => setStep(1),
          onNext: () => setStep(3),
          meetingType
        }
      ),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Step3,
        {
          form,
          onChange: setForm,
          onBack: () => setStep(2),
          onSubmit: handleSubmit,
          isSubmitting: createBooking.isPending,
          meetingType,
          selectedDate,
          selectedSlot
        }
      )
    ] })
  ] });
}
const MEETING_CONFIGS = {
  physical: {
    icon: MapPin,
    title: "In-Person Meeting",
    badge: "At School",
    description: "Visit MaxFort School, Rohini for a face-to-face meeting with administration staff.",
    details: [
      "MaxFort School, Sector 9, Rohini, Delhi – 110085",
      "Entry through the main gate",
      "Please carry a valid photo ID"
    ]
  },
  online: {
    icon: Video,
    title: "Online Meeting",
    badge: "Virtual",
    description: "Connect remotely via video call. Meeting link will be sent to your email.",
    details: [
      "Google Meet / Zoom link via email",
      "No travel required",
      "Available to parents across Delhi NCR"
    ]
  }
};
function Step1({
  meetingType,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "How would you like to meet?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "Choose the format that works best for you. Both options are available for most appointment types." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: ["physical", "online"].map((type) => {
      const cfg = MEETING_CONFIGS[type];
      const Icon = cfg.icon;
      const isSelected = meetingType === type;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSelect(type),
          "data-ocid": `meeting-type-${type}`,
          "aria-pressed": isSelected,
          className: `group p-6 rounded-2xl border-2 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isSelected ? "border-primary bg-primary/5 shadow-subtle" : "border-border bg-card hover:border-primary/40 hover:shadow-subtle"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-12 w-12 rounded-xl flex items-center justify-center transition-smooth ${isSelected ? "bg-primary" : "bg-muted group-hover:bg-primary/10"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      className: `h-6 w-6 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: isSelected ? "default" : "secondary",
                  className: "text-xs",
                  children: cfg.badge
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-1.5", children: cfg.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: cfg.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: cfg.details.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${isSelected ? "bg-primary" : "bg-muted-foreground"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: isSelected ? "text-foreground/80" : "text-muted-foreground",
                  children: d
                }
              )
            ] }, d)) })
          ]
        },
        type
      );
    }) })
  ] });
}
function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function Step2({
  selectedDate,
  onDateChange,
  today,
  slots,
  slotsLoading,
  selectedSlot,
  onSlotSelect,
  onBack,
  onNext,
  meetingType
}) {
  const todayDate = /* @__PURE__ */ new Date(`${today}T12:00:00`);
  const [calYear, setCalYear] = reactExports.useState(todayDate.getFullYear());
  const [calMonth, setCalMonth] = reactExports.useState(todayDate.getMonth());
  const cells = buildCalendar(calYear, calMonth);
  const todayStr = today;
  function toDateStr(day) {
    return `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
  function prevMonth() {
    if (calMonth === 0) {
      setCalYear((y) => y - 1);
      setCalMonth(11);
    } else {
      setCalMonth((m) => m - 1);
    }
  }
  function nextMonth() {
    if (calMonth === 11) {
      setCalYear((y) => y + 1);
      setCalMonth(0);
    } else {
      setCalMonth((m) => m + 1);
    }
  }
  const isBeforeToday = (dateStr) => dateStr < todayStr;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Select a Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize text-xs", children: meetingType === "physical" ? "In-Person" : "Online" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Dates with available slots are shown. Select one to see time options." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: prevMonth,
              "aria-label": "Previous month",
              className: "h-8 w-8 rounded-md flex items-center justify-center hover:bg-muted transition-colors",
              "data-ocid": "cal-prev",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-foreground", children: [
            MONTH_NAMES[calMonth],
            " ",
            calYear
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: nextMonth,
              "aria-label": "Next month",
              className: "h-8 w-8 rounded-md flex items-center justify-center hover:bg-muted transition-colors",
              "data-ocid": "cal-next",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 mb-2", children: DAY_NAMES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center text-xs font-semibold text-muted-foreground py-1",
              children: d
            },
            d
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-y-1", children: cells.map((day, idx) => {
            if (!day) {
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `empty-${idx}`);
            }
            const dateStr = toDateStr(day);
            const isPast = isBeforeToday(dateStr);
            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === todayStr;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                disabled: isPast,
                onClick: () => onDateChange(dateStr),
                "data-ocid": `cal-day-${dateStr}`,
                "aria-label": `${day} ${MONTH_NAMES[calMonth]} ${calYear}`,
                "aria-pressed": isSelected,
                className: `relative mx-auto h-9 w-9 rounded-lg flex items-center justify-center text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${isPast ? "text-muted-foreground/40 cursor-not-allowed" : isSelected ? "bg-primary text-primary-foreground shadow-sm" : isToday ? "border border-primary text-primary font-bold hover:bg-primary/10" : "text-foreground hover:bg-muted"}`,
                children: [
                  day,
                  isToday && !isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" })
                ]
              },
              dateStr
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: onBack,
            "data-ocid": "step2-back",
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
              "Back"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onNext,
            disabled: !selectedSlot,
            "data-ocid": "step2-next",
            className: "gap-2",
            children: [
              "Continue",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: "Available Times" }),
      !selectedDate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl bg-muted/40 border border-dashed border-border p-8 text-center",
          "data-ocid": "slot-prompt",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Select a date to see available time slots" })
          ]
        }
      ) : slotsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "slot-loading", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Checking availability…" }),
        Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no id
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }, i)
        ))
      ] }) : slots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl bg-muted/40 border border-dashed border-border p-8 text-center",
          "data-ocid": "no-slots-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No slots available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Try another date — we're typically available Mon, Tue & Thu" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "slot-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-3", children: [
          slots.length,
          " slot",
          slots.length !== 1 ? "s" : "",
          " available — select one below"
        ] }),
        slots.map((slot) => {
          const isSelected = (selectedSlot == null ? void 0 : selectedSlot.startTime) === slot.startTime;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onSlotSelect(slot),
              "data-ocid": `slot-${slot.startTime}`,
              "aria-pressed": isSelected,
              className: `w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 opacity-70" }),
                  slot.startTime
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs opacity-70", children: [
                  "– ",
                  slot.endTime
                ] })
              ]
            },
            slot.startTime
          );
        })
      ] })
    ] })
  ] });
}
function Step3({
  form,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  meetingType,
  selectedDate,
  selectedSlot
}) {
  const formattedDate = selectedDate ? (/* @__PURE__ */ new Date(`${selectedDate}T12:00:00`)).toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }) : "";
  const cfg = MEETING_CONFIGS[meetingType];
  const Icon = cfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-8 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit,
        className: "lg:col-span-3 space-y-5",
        "data-ocid": "booking-form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-1", children: "Your Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We'll use these to confirm your booking and send you any updates." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "visitor-name",
                  className: "mb-1.5 block text-sm font-medium",
                  children: [
                    "Full Name ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "visitor-name",
                  required: true,
                  autoComplete: "name",
                  placeholder: "e.g. Priya Sharma",
                  value: form.visitorName,
                  onChange: (e) => onChange({ ...form, visitorName: e.target.value }),
                  "data-ocid": "visitor-name-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "visitor-email",
                  className: "mb-1.5 block text-sm font-medium",
                  children: [
                    "Email Address ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "visitor-email",
                  type: "email",
                  required: true,
                  autoComplete: "email",
                  placeholder: "e.g. priya@example.com",
                  value: form.visitorEmail,
                  onChange: (e) => onChange({ ...form, visitorEmail: e.target.value }),
                  "data-ocid": "visitor-email-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: meetingType === "online" ? "Video call link will be sent here" : "Booking confirmation will be sent here" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "topic-select",
                  className: "mb-1.5 block text-sm font-medium",
                  children: [
                    "Meeting Topic ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "topic-select",
                  required: true,
                  value: form.topic,
                  onChange: (e) => onChange({ ...form, topic: e.target.value }),
                  "data-ocid": "topic-select",
                  className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select a topic…" }),
                    MEETING_TOPICS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t))
                  ]
                }
              )
            ] }),
            form.topic === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "custom-topic",
                  className: "mb-1.5 block text-sm font-medium",
                  children: [
                    "Describe your topic ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "custom-topic",
                  required: true,
                  placeholder: "Brief description of your concern…",
                  value: form.customTopic,
                  onChange: (e) => onChange({ ...form, customTopic: e.target.value }),
                  "data-ocid": "custom-topic-input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onBack,
                "data-ocid": "step3-back",
                className: "gap-1",
                disabled: isSubmitting,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                  "Back"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: isSubmitting,
                className: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2 flex-1 sm:flex-none",
                "data-ocid": "confirm-booking-btn",
                children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                  "Confirming…"
                ] }) : "Confirm Booking"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-muted/20 shadow-subtle overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 bg-primary/5 border-b border-border flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Meeting Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: cfg.title })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-5 space-y-4", children: [
        formattedDate && /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { icon: Calendar, label: "Date", value: formattedDate }),
        selectedSlot && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SummaryRow,
          {
            icon: Clock,
            label: "Time",
            value: `${selectedSlot.startTime} – ${selectedSlot.endTime}`
          }
        ),
        meetingType === "physical" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground leading-snug", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "MaxFort School Rohini" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sector 9, Rohini, Delhi – 110085" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-accent/10 border border-accent/20 px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent-foreground/90 flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 flex-shrink-0 mt-0.5" }),
            "Please carry a valid photo ID when visiting the school."
          ] }) })
        ] }),
        meetingType === "online" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-3 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-4 w-4 text-primary flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground leading-snug", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Virtual Meeting" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Google Meet / Zoom link will be sent to your email" })
          ] })
        ] }) })
      ] })
    ] }) })
  ] });
}
function SummaryRow({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground break-words", children: value })
    ] })
  ] });
}
export {
  BookingPage as default
};
