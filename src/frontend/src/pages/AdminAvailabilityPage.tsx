import {
  AlertCircle,
  CalendarX,
  CheckCircle2,
  Clock,
  MapPin,
  Monitor,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "../components/AdminLayout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import {
  DAYS,
  useAddBlockedDate,
  useAvailabilityRules,
  useBlockedDates,
  useCreateRule,
  useDeleteRule,
  useIsActorReady,
  useRemoveBlockedDate,
} from "../hooks/useBackend";
import type { MeetingType } from "../types";

// ── Constants ──────────────────────────────────────────────────────────────────

const SLOT_DURATIONS = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "60 min", value: 60 },
];

// ── Rule Add Form ──────────────────────────────────────────────────────────────

interface RuleFormValues {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  meetingTypes: MeetingType[];
}

const DEFAULT_RULE: RuleFormValues = {
  dayOfWeek: "",
  startTime: "09:00",
  endTime: "17:00",
  slotDurationMinutes: 30,
  meetingTypes: ["online", "physical"],
};

function RuleAddPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<RuleFormValues>(DEFAULT_RULE);
  const [saved, setSaved] = useState(false);
  const { mutate, isPending, isError, error } = useCreateRule();
  const { isReady, isFetching } = useIsActorReady();

  function toggleType(t: MeetingType) {
    setForm((f) => ({
      ...f,
      meetingTypes: f.meetingTypes.includes(t)
        ? f.meetingTypes.filter((x) => x !== t)
        : [...f.meetingTypes, t],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);

    if (!isReady) {
      toast.error(
        "Backend is still connecting. Please wait a moment and try again.",
      );
      return;
    }
    if (!form.dayOfWeek) {
      toast.error("Please select a day of week.");
      return;
    }
    if (form.startTime >= form.endTime) {
      toast.error("End time must be after start time.");
      return;
    }
    if (form.meetingTypes.length === 0) {
      toast.error("Select at least one meeting type.");
      return;
    }

    mutate(
      {
        dayOfWeek: Number(form.dayOfWeek),
        startTime: form.startTime,
        endTime: form.endTime,
        slotDurationMinutes: form.slotDurationMinutes,
        meetingTypes: form.meetingTypes,
      },
      {
        onSuccess: () => {
          setSaved(true);
          toast.success("Availability rule saved successfully!");
          setTimeout(() => {
            onClose();
          }, 800);
        },
        onError: (err) => {
          console.error("Failed to add rule:", err);
          toast.error(
            err instanceof Error
              ? err.message
              : "Failed to save rule. Please try again.",
          );
        },
      },
    );
  }

  const isBackendBusy = isFetching && !isReady;

  return (
    <div className="bg-card border-2 border-primary/40 rounded-xl overflow-hidden shadow-lg mb-4">
      {/* Form header bar */}
      <div className="bg-primary/10 px-5 py-3.5 border-b border-primary/20 flex items-center justify-between">
        <p className="font-display font-semibold text-foreground text-sm flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary" />
          New Availability Rule
        </p>
        {isBackendBusy && (
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Connecting to backend…
          </span>
        )}
        {isReady && (
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Ready
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Day */}
          <div className="space-y-1.5">
            <Label htmlFor="rule-day">Day of Week *</Label>
            <Select
              value={form.dayOfWeek}
              onValueChange={(v) => setForm((f) => ({ ...f, dayOfWeek: v }))}
            >
              <SelectTrigger id="rule-day" data-ocid="rule-day-select">
                <SelectValue placeholder="Select day…" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day, i) => (
                  <SelectItem key={day} value={String(i)}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Slot duration */}
          <div className="space-y-1.5">
            <Label>Slot Duration</Label>
            <div className="flex gap-2">
              {SLOT_DURATIONS.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setForm((f) => ({ ...f, slotDurationMinutes: value }))
                  }
                  data-ocid={`duration-${value}`}
                  className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-smooth ${
                    form.slotDurationMinutes === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Start */}
          <div className="space-y-1.5">
            <Label htmlFor="rule-start">Start Time</Label>
            <Input
              id="rule-start"
              type="time"
              value={form.startTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, startTime: e.target.value }))
              }
              data-ocid="rule-start-input"
            />
          </div>

          {/* End */}
          <div className="space-y-1.5">
            <Label htmlFor="rule-end">End Time</Label>
            <Input
              id="rule-end"
              type="time"
              value={form.endTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, endTime: e.target.value }))
              }
              data-ocid="rule-end-input"
            />
          </div>
        </div>

        {/* Meeting types */}
        <div className="space-y-2">
          <Label>Meeting Types *</Label>
          <div className="flex gap-6">
            {(["online", "physical"] as MeetingType[]).map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Checkbox
                  id={`new-type-${t}`}
                  checked={form.meetingTypes.includes(t)}
                  onCheckedChange={() => toggleType(t)}
                  data-ocid={`rule-type-${t}`}
                />
                <Label
                  htmlFor={`new-type-${t}`}
                  className="text-sm capitalize cursor-pointer flex items-center gap-1.5"
                >
                  {t === "online" ? (
                    <Monitor className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <MapPin className="h-3.5 w-3.5 text-accent-foreground" />
                  )}
                  {t}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Error feedback */}
        {isError && (
          <div
            className="flex items-start gap-2.5 rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive"
            data-ocid="rule-save-error"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              {error instanceof Error
                ? error.message
                : "Failed to save rule. Please try again."}
            </span>
          </div>
        )}

        {/* Success flash */}
        {saved && (
          <div className="flex items-center gap-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            Rule saved! Closing form…
          </div>
        )}

        {/* ─── SAVE RULE BUTTON — full width, large, unmissable ─── */}
        <div className="pt-2 space-y-2" data-ocid="rule-submit-section">
          <button
            type="submit"
            disabled={isPending || isBackendBusy || saved}
            data-ocid="rule-submit-btn"
            className={`
              w-full flex items-center justify-center gap-3
              rounded-xl py-4 px-6
              text-base font-semibold tracking-wide
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              shadow-md
              ${
                saved
                  ? "bg-emerald-500 text-white cursor-default"
                  : isPending || isBackendBusy
                    ? "bg-primary/60 text-primary-foreground cursor-not-allowed opacity-80"
                    : "bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground hover:shadow-lg"
              }
            `}
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Rule Saved!
              </>
            ) : isPending ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                Saving Rule…
              </>
            ) : isBackendBusy ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Rule
              </>
            )}
          </button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={onClose}
            data-ocid="rule-cancel-btn"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

// ── Availability Rules Section ─────────────────────────────────────────────────

export function AvailabilityRulesSection() {
  const { data: rules = [], isLoading } = useAvailabilityRules();
  const { mutate: deleteRule, isPending: isDeleting } = useDeleteRule();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(id: string, dayName: string) {
    const confirmed = window.confirm(
      `Remove the ${dayName} availability rule? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(id);
    deleteRule(id, {
      onSuccess: () => {
        toast.success(`${dayName} rule removed successfully.`);
        setDeletingId(null);
      },
      onError: (err) => {
        console.error("Failed to delete rule:", err);
        toast.error("Failed to remove rule. Please try again.");
        setDeletingId(null);
      },
    });
  }

  return (
    <section aria-labelledby="rules-heading" className="space-y-4">
      {/* Section header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            id="rules-heading"
            className="font-display font-semibold text-foreground text-xl"
          >
            Weekly Availability Rules
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Recurring time windows when meetings can be booked.
          </p>
        </div>
        <Button
          size="sm"
          variant={showForm ? "outline" : "default"}
          onClick={() => setShowForm((v) => !v)}
          data-ocid="add-rule-btn"
          className="flex-shrink-0 mt-1"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          {showForm ? "Cancel" : "Add Rule"}
        </Button>
      </div>

      {/* Inline add form — shown when showForm is true */}
      {showForm && <RuleAddPanel onClose={() => setShowForm(false)} />}

      {/* Rules table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : rules.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 px-6 text-center"
            data-ocid="rules-empty-state"
          >
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-3">
              <Clock className="h-7 w-7 text-muted-foreground/50" />
            </div>
            <p className="font-medium text-foreground">No rules configured</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Add weekly rules to define the time slots visitors can book.
            </p>
            <Button
              size="sm"
              className="mt-4"
              onClick={() => setShowForm(true)}
              data-ocid="rules-empty-add-btn"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add First Rule
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto" data-ocid="rules-list">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Day
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Time Window
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Slot Duration
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Meeting Types
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule, idx) => {
                  const dayName =
                    DAYS[rule.dayOfWeek] ?? `Day ${rule.dayOfWeek}`;
                  const isThisDeleting = deletingId === rule.id;
                  return (
                    <tr
                      key={rule.id}
                      className={`border-b border-border last:border-0 transition-colors ${
                        isThisDeleting ? "opacity-50" : "hover:bg-muted/30"
                      } ${idx % 2 === 1 ? "bg-muted/10" : ""}`}
                      data-ocid={`rule-row-${rule.id}`}
                    >
                      <td className="px-4 py-3 font-medium text-foreground">
                        {dayName}
                      </td>
                      <td className="px-4 py-3 text-foreground tabular-nums font-mono text-xs">
                        {rule.startTime} – {rule.endTime}
                      </td>
                      <td className="px-4 py-3 tabular-nums text-muted-foreground">
                        {rule.slotDurationMinutes} min
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {rule.meetingTypes.map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="text-xs capitalize gap-1 font-normal"
                            >
                              {t === "online" ? (
                                <Monitor className="h-2.5 w-2.5" />
                              ) : (
                                <MapPin className="h-2.5 w-2.5" />
                              )}
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-9 gap-1.5 px-4 text-xs font-semibold"
                          onClick={() => handleDelete(rule.id, dayName)}
                          disabled={isDeleting || isThisDeleting}
                          aria-label={`Delete ${dayName} rule`}
                          data-ocid={`delete-rule-btn-${rule.id}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {isThisDeleting ? "Removing…" : "Remove"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Blocked Dates Section ──────────────────────────────────────────────────────

export function BlockedDatesSection() {
  const { data: blocked = [], isLoading } = useBlockedDates();
  const { mutate: addBlocked, isPending: isAdding } = useAddBlockedDate();
  const { mutate: removeBlocked } = useRemoveBlockedDate();

  const [showForm, setShowForm] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!dateInput) {
      toast.error("Please select a date.");
      return;
    }
    addBlocked(
      { date: dateInput, reason: reasonInput.trim() || undefined },
      {
        onSuccess: () => {
          toast.success("Date blocked successfully.");
          setDateInput("");
          setReasonInput("");
          setShowForm(false);
        },
        onError: (err) => {
          console.error("Failed to block date:", err);
          toast.error("Failed to block date. Please try again.");
        },
      },
    );
  }

  function handleRemove(id: string, dateLabel: string) {
    const confirmed = window.confirm(
      `Unblock ${dateLabel}? Visitors will be able to book on this date again.`,
    );
    if (!confirmed) return;

    setRemovingId(id);
    removeBlocked(id, {
      onSuccess: () => {
        toast.success("Date unblocked successfully.");
        setRemovingId(null);
      },
      onError: (err) => {
        console.error("Failed to unblock date:", err);
        toast.error("Failed to unblock date. Please try again.");
        setRemovingId(null);
      },
    });
  }

  const sorted = [...blocked].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section aria-labelledby="blocked-heading" className="space-y-4">
      {/* Section header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            id="blocked-heading"
            className="font-display font-semibold text-foreground text-xl"
          >
            Blocked Dates
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Specific dates with no availability — holidays, closures, or events.
          </p>
        </div>
        <Button
          size="sm"
          variant={showForm ? "outline" : "default"}
          onClick={() => setShowForm((v) => !v)}
          data-ocid="add-blocked-btn"
          className="flex-shrink-0 mt-1"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          {showForm ? "Cancel" : "Block Date"}
        </Button>
      </div>

      {/* Inline add form */}
      {showForm && (
        <div className="bg-card border-2 border-primary/30 rounded-xl overflow-hidden shadow-md">
          <div className="bg-primary/10 px-5 py-3 border-b border-primary/20">
            <p className="font-display font-semibold text-foreground text-sm flex items-center gap-2">
              <CalendarX className="h-4 w-4 text-primary" />
              Block a Date
            </p>
          </div>
          <form onSubmit={handleAdd} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="blocked-date">Date *</Label>
                <Input
                  id="blocked-date"
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  min={today}
                  required
                  data-ocid="blocked-date-input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="blocked-reason">
                  Reason{" "}
                  <span className="text-muted-foreground font-normal text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="blocked-reason"
                  type="text"
                  placeholder="e.g. School Holiday, Staff Meeting…"
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  maxLength={120}
                  data-ocid="blocked-reason-input"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">* Required field</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowForm(false);
                    setDateInput("");
                    setReasonInput("");
                  }}
                  data-ocid="blocked-cancel-btn"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isAdding}
                  className="min-w-[110px]"
                  data-ocid="blocked-submit-btn"
                >
                  {isAdding ? "Blocking…" : "Block Date"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Blocked dates list */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 px-6 text-center"
            data-ocid="blocked-empty"
          >
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-3">
              <CalendarX className="h-7 w-7 text-muted-foreground/50" />
            </div>
            <p className="font-medium text-foreground">No blocked dates</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Block dates for school holidays, closures, or other
              unavailability.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border" data-ocid="blocked-list">
            {sorted.map((bd) => {
              const dateObj = new Date(`${bd.date}T12:00:00`);
              const formatted = dateObj.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              const isPast = bd.date < today;
              const isThisRemoving = removingId === bd.id;
              return (
                <li
                  key={bd.id}
                  className={`flex items-center justify-between gap-4 px-4 py-3.5 transition-colors ${
                    isThisRemoving ? "opacity-50" : "hover:bg-muted/30"
                  }`}
                  data-ocid={`blocked-row-${bd.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CalendarX
                      className={`h-4 w-4 flex-shrink-0 ${
                        isPast
                          ? "text-muted-foreground/40"
                          : "text-destructive/70"
                      }`}
                    />
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-medium flex items-center gap-2 ${
                          isPast ? "text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {formatted}
                        {isPast && (
                          <Badge
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            Past
                          </Badge>
                        )}
                      </p>
                      {bd.reason && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {bd.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-9 gap-1.5 px-4 text-xs font-semibold flex-shrink-0"
                    onClick={() => handleRemove(bd.id, formatted)}
                    disabled={isThisRemoving}
                    aria-label={`Unblock ${formatted}`}
                    data-ocid={`unblock-btn-${bd.id}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {isThisRemoving ? "Removing…" : "Unblock"}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AdminAvailabilityPage() {
  return (
    <AdminLayout>
      {/* Page header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display font-bold text-foreground text-3xl tracking-tight">
          Availability Settings
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-xl">
          Configure when meetings can be booked at Maxfort School Rohini — set
          recurring weekly rules and block specific dates for holidays or
          closures.
        </p>
      </div>

      {/* Two sections */}
      <div className="space-y-10">
        <AvailabilityRulesSection />
        <hr className="border-border" />
        <BlockedDatesSection />
      </div>
    </AdminLayout>
  );
}
