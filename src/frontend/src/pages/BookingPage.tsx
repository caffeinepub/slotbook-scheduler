import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Monitor,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PublicLayout } from "../components/PublicLayout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Skeleton } from "../components/ui/skeleton";
import { useAvailableSlots, useCreateBooking } from "../hooks/useBackend";
import type { MeetingType, TimeSlot } from "../types";

const MEETING_TOPICS = [
  "Admission Inquiry",
  "Fee Structure & Payment",
  "Academic Progress Review",
  "Disciplinary Matter",
  "Parent-Teacher Meeting",
  "Scholarship & Bursary",
  "Extra-Curricular Activities",
  "Infrastructure Query",
  "Other",
];

const STEP_LABELS = ["Choose Type", "Pick Date & Time", "Your Details"];

type FormState = {
  visitorName: string;
  visitorEmail: string;
  topic: string;
  customTopic: string;
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [meetingType, setMeetingType] = useState<MeetingType>("physical");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [form, setForm] = useState<FormState>({
    visitorName: "",
    visitorEmail: "",
    topic: "",
    customTopic: "",
  });

  const { data: slots = [], isLoading: slotsLoading } = useAvailableSlots(
    selectedDate,
    meetingType,
  );
  const createBooking = useCreateBooking();

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !selectedDate) return;
    const topic = form.topic === "Other" ? form.customTopic : form.topic;
    if (!topic.trim()) {
      toast.error("Please enter a meeting topic.");
      return;
    }
    try {
      const booking = await createBooking.mutateAsync({
        visitorName: form.visitorName.trim(),
        visitorEmail: form.visitorEmail.trim(),
        topic,
        date: selectedDate,
        timeSlot: selectedSlot,
        meetingType,
      });
      sessionStorage.setItem("lastBooking", JSON.stringify(booking));
      navigate({ to: "/confirmation" });
    } catch {
      toast.error("Could not book meeting. Please try again.");
    }
  };

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <div
        className="relative h-48 sm:h-60 bg-primary overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/school-hero.dim_1200x400.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-primary/65" />
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-8 max-w-5xl mx-auto gap-1">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-xs font-body mb-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>MaxFort School, Sector 9, Rohini, Delhi</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground leading-tight">
            Book a Meeting
          </h1>
          <p className="text-primary-foreground/75 text-sm mt-1 max-w-md">
            Schedule time with school administration — online or in person.
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-1" aria-label="Booking steps">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const isActive = step === n;
              const isDone = step > n;
              return (
                <div key={label} className="flex items-center gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold transition-smooth ${
                        isDone
                          ? "bg-primary text-primary-foreground"
                          : isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : n}
                    </span>
                    <span
                      className={`text-xs hidden sm:inline ${
                        isActive
                          ? "text-foreground font-semibold"
                          : isDone
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 2 && (
                    <ChevronRight className="h-3 w-3 text-muted-foreground mx-1" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        {step === 1 && (
          <Step1
            meetingType={meetingType}
            onSelect={(t) => {
              setMeetingType(t);
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <Step2
            selectedDate={selectedDate}
            onDateChange={(d) => {
              setSelectedDate(d);
              setSelectedSlot(null);
            }}
            today={today}
            slots={slots}
            slotsLoading={slotsLoading}
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            meetingType={meetingType}
          />
        )}
        {step === 3 && (
          <Step3
            form={form}
            onChange={setForm}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            isSubmitting={createBooking.isPending}
            meetingType={meetingType}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
          />
        )}
      </div>
    </PublicLayout>
  );
}

// ---------------------------------------------------------------------------
// Step 1: Choose meeting type
// ---------------------------------------------------------------------------

const MEETING_CONFIGS: Record<
  MeetingType,
  {
    icon: React.ElementType;
    title: string;
    description: string;
    badge: string;
    details: string[];
  }
> = {
  physical: {
    icon: MapPin,
    title: "In-Person Meeting",
    badge: "At School",
    description:
      "Visit MaxFort School, Rohini for a face-to-face meeting with administration staff.",
    details: [
      "MaxFort School, Sector 9, Rohini, Delhi – 110085",
      "Entry through the main gate",
      "Please carry a valid photo ID",
    ],
  },
  online: {
    icon: Video,
    title: "Online Meeting",
    badge: "Virtual",
    description:
      "Connect remotely via video call. Meeting link will be sent to your email.",
    details: [
      "Google Meet / Zoom link via email",
      "No travel required",
      "Available to parents across Delhi NCR",
    ],
  },
};

function Step1({
  meetingType,
  onSelect,
}: {
  meetingType: MeetingType;
  onSelect: (t: MeetingType) => void;
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
        How would you like to meet?
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Choose the format that works best for you. Both options are available
        for most appointment types.
      </p>
      <div className="grid sm:grid-cols-2 gap-5">
        {(["physical", "online"] as MeetingType[]).map((type) => {
          const cfg = MEETING_CONFIGS[type];
          const Icon = cfg.icon;
          const isSelected = meetingType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              data-ocid={`meeting-type-${type}`}
              aria-pressed={isSelected}
              className={`group p-6 rounded-2xl border-2 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-subtle"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-subtle"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center transition-smooth ${
                    isSelected
                      ? "bg-primary"
                      : "bg-muted group-hover:bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      isSelected
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <Badge
                  variant={isSelected ? "default" : "secondary"}
                  className="text-xs"
                >
                  {cfg.badge}
                </Badge>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1.5">
                {cfg.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {cfg.description}
              </p>
              <ul className="space-y-1.5">
                {cfg.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-xs">
                    <span
                      className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                        isSelected ? "bg-primary" : "bg-muted-foreground"
                      }`}
                    />
                    <span
                      className={
                        isSelected
                          ? "text-foreground/80"
                          : "text-muted-foreground"
                      }
                    >
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2: Calendar + time slot picker
// ---------------------------------------------------------------------------

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
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
  "December",
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
  meetingType,
}: {
  selectedDate: string;
  onDateChange: (d: string) => void;
  today: string;
  slots: TimeSlot[];
  slotsLoading: boolean;
  selectedSlot: TimeSlot | null;
  onSlotSelect: (s: TimeSlot) => void;
  onBack: () => void;
  onNext: () => void;
  meetingType: MeetingType;
}) {
  const todayDate = new Date(`${today}T12:00:00`);
  const [calYear, setCalYear] = useState(todayDate.getFullYear());
  const [calMonth, setCalMonth] = useState(todayDate.getMonth());

  const cells = buildCalendar(calYear, calMonth);
  const todayStr = today;

  function toDateStr(day: number) {
    return `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` as string;
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

  const isBeforeToday = (dateStr: string) => dateStr < todayStr;

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Calendar */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Select a Date
          </h2>
          <Badge variant="outline" className="capitalize text-xs">
            {meetingType === "physical" ? "In-Person" : "Online"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Dates with available slots are shown. Select one to see time options.
        </p>

        <Card className="border-border shadow-subtle overflow-hidden">
          {/* Calendar nav */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
              data-ocid="cal-prev"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <span className="font-display font-semibold text-foreground">
              {MONTH_NAMES[calMonth]} {calYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
              data-ocid="cal-next"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </div>

          <div className="p-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-semibold text-muted-foreground py-1"
                >
                  {d}
                </div>
              ))}
            </div>
            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((day, idx) => {
                if (!day) {
                  // biome-ignore lint/suspicious/noArrayIndexKey: calendar empty cells have no stable id
                  return <div key={`empty-${idx}`} />;
                }
                const dateStr = toDateStr(day);
                const isPast = isBeforeToday(dateStr);
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === todayStr;

                return (
                  <button
                    key={dateStr}
                    type="button"
                    disabled={isPast}
                    onClick={() => onDateChange(dateStr)}
                    data-ocid={`cal-day-${dateStr}`}
                    aria-label={`${day} ${MONTH_NAMES[calMonth]} ${calYear}`}
                    aria-pressed={isSelected}
                    className={`relative mx-auto h-9 w-9 rounded-lg flex items-center justify-center text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                      isPast
                        ? "text-muted-foreground/40 cursor-not-allowed"
                        : isSelected
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : isToday
                            ? "border border-primary text-primary font-bold hover:bg-primary/10"
                            : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {day}
                    {isToday && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onBack}
            data-ocid="step2-back"
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!selectedSlot}
            data-ocid="step2-next"
            className="gap-2"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Slot panel */}
      <div className="lg:col-span-2">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          Available Times
        </h3>
        {!selectedDate ? (
          <div
            className="rounded-xl bg-muted/40 border border-dashed border-border p-8 text-center"
            data-ocid="slot-prompt"
          >
            <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Select a date to see available time slots
            </p>
          </div>
        ) : slotsLoading ? (
          <div className="space-y-2" data-ocid="slot-loading">
            <p className="text-xs text-muted-foreground mb-3">
              Checking availability…
            </p>
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no id
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        ) : slots.length === 0 ? (
          <div
            className="rounded-xl bg-muted/40 border border-dashed border-border p-8 text-center"
            data-ocid="no-slots-empty"
          >
            <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">
              No slots available
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try another date — we're typically available Mon, Tue & Thu
            </p>
          </div>
        ) : (
          <div className="space-y-2" data-ocid="slot-grid">
            <p className="text-xs text-muted-foreground mb-3">
              {slots.length} slot{slots.length !== 1 ? "s" : ""} available —
              select one below
            </p>
            {slots.map((slot) => {
              const isSelected = selectedSlot?.startTime === slot.startTime;
              return (
                <button
                  key={slot.startTime}
                  type="button"
                  onClick={() => onSlotSelect(slot)}
                  data-ocid={`slot-${slot.startTime}`}
                  aria-pressed={isSelected}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 opacity-70" />
                    {slot.startTime}
                  </span>
                  <span className="text-xs opacity-70">– {slot.endTime}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3: Visitor details + confirmation
// ---------------------------------------------------------------------------

function Step3({
  form,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  meetingType,
  selectedDate,
  selectedSlot,
}: {
  form: FormState;
  onChange: (f: FormState) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  meetingType: MeetingType;
  selectedDate: string;
  selectedSlot: TimeSlot | null;
}) {
  const formattedDate = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const cfg = MEETING_CONFIGS[meetingType];
  const Icon = cfg.icon;

  return (
    <div className="grid lg:grid-cols-5 gap-8 max-w-4xl">
      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="lg:col-span-3 space-y-5"
        data-ocid="booking-form"
      >
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-1">
            Your Details
          </h2>
          <p className="text-sm text-muted-foreground">
            We'll use these to confirm your booking and send you any updates.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="visitor-name"
              className="mb-1.5 block text-sm font-medium"
            >
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="visitor-name"
              required
              autoComplete="name"
              placeholder="e.g. Priya Sharma"
              value={form.visitorName}
              onChange={(e) =>
                onChange({ ...form, visitorName: e.target.value })
              }
              data-ocid="visitor-name-input"
            />
          </div>

          <div>
            <Label
              htmlFor="visitor-email"
              className="mb-1.5 block text-sm font-medium"
            >
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="visitor-email"
              type="email"
              required
              autoComplete="email"
              placeholder="e.g. priya@example.com"
              value={form.visitorEmail}
              onChange={(e) =>
                onChange({ ...form, visitorEmail: e.target.value })
              }
              data-ocid="visitor-email-input"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {meetingType === "online"
                ? "Video call link will be sent here"
                : "Booking confirmation will be sent here"}
            </p>
          </div>

          <div>
            <Label
              htmlFor="topic-select"
              className="mb-1.5 block text-sm font-medium"
            >
              Meeting Topic <span className="text-destructive">*</span>
            </Label>
            <select
              id="topic-select"
              required
              value={form.topic}
              onChange={(e) => onChange({ ...form, topic: e.target.value })}
              data-ocid="topic-select"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
            >
              <option value="" disabled>
                Select a topic…
              </option>
              {MEETING_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {form.topic === "Other" && (
            <div>
              <Label
                htmlFor="custom-topic"
                className="mb-1.5 block text-sm font-medium"
              >
                Describe your topic <span className="text-destructive">*</span>
              </Label>
              <Input
                id="custom-topic"
                required
                placeholder="Brief description of your concern…"
                value={form.customTopic}
                onChange={(e) =>
                  onChange({ ...form, customTopic: e.target.value })
                }
                data-ocid="custom-topic-input"
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            data-ocid="step3-back"
            className="gap-1"
            disabled={isSubmitting}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2 flex-1 sm:flex-none"
            data-ocid="confirm-booking-btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Confirming…
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </div>
      </form>

      {/* Summary card */}
      <div className="lg:col-span-2">
        <Card className="border-border bg-muted/20 shadow-subtle overflow-hidden">
          <div className="px-5 py-4 bg-primary/5 border-b border-border flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Meeting Type</p>
              <p className="text-sm font-semibold text-foreground">
                {cfg.title}
              </p>
            </div>
          </div>
          <CardContent className="pt-4 pb-5 space-y-4">
            {formattedDate && (
              <SummaryRow icon={Calendar} label="Date" value={formattedDate} />
            )}
            {selectedSlot && (
              <SummaryRow
                icon={Clock}
                label="Time"
                value={`${selectedSlot.startTime} – ${selectedSlot.endTime}`}
              />
            )}
            {meetingType === "physical" && (
              <>
                <div className="border-t border-border pt-3 mt-1">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Location
                  </p>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-foreground leading-snug">
                      <p className="font-medium">MaxFort School Rohini</p>
                      <p className="text-muted-foreground">
                        Sector 9, Rohini, Delhi – 110085
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-accent/10 border border-accent/20 px-3 py-2.5">
                  <p className="text-xs text-accent-foreground/90 flex items-start gap-2">
                    <Users className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                    Please carry a valid photo ID when visiting the school.
                  </p>
                </div>
              </>
            )}
            {meetingType === "online" && (
              <div className="border-t border-border pt-3 mt-1">
                <div className="flex items-start gap-2.5">
                  <Monitor className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground leading-snug">
                    <p className="font-medium">Virtual Meeting</p>
                    <p className="text-muted-foreground">
                      Google Meet / Zoom link will be sent to your email
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
