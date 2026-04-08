import {
  AlertTriangle,
  CalendarX,
  Clock,
  MapPin,
  Monitor,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "../components/AdminLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
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
  useRemoveBlockedDate,
} from "../hooks/useBackend";
import type { MeetingType } from "../types";

// ── Constants ──────────────────────────────────────────────────────────────────

const SLOT_DURATIONS = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "60 min", value: 60 },
];

// ── Rule Add Form (inline panel) ───────────────────────────────────────────────

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
  const { mutate, isPending } = useCreateRule();

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
          toast.success("Availability rule added.");
          onClose();
        },
        onError: () => toast.error("Failed to add rule. Please try again."),
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-accent/5 border border-accent/30 rounded-xl p-5 mb-4 space-y-4 animate-slide-up"
    >
      <p className="font-display font-semibold text-foreground text-sm">
        New Availability Rule
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Day */}
        <div className="space-y-1.5">
          <Label htmlFor="rule-day">Day of Week</Label>
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
                    : "border-border bg-card text-foreground hover:border-primary/60"
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
        <Label>Meeting Types</Label>
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

      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          data-ocid="rule-submit-btn"
        >
          {isPending ? "Saving…" : "Add Rule"}
        </Button>
      </div>
    </form>
  );
}

// ── Availability Rules Section ─────────────────────────────────────────────────

function AvailabilityRulesSection() {
  const { data: rules = [], isLoading } = useAvailabilityRules();
  const { mutate: deleteRule, isPending: isDeleting } = useDeleteRule();
  const [showForm, setShowForm] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);

  function handleDelete() {
    if (!pendingId) return;
    deleteRule(pendingId, {
      onSuccess: () => {
        toast.success("Rule removed.");
        setPendingId(null);
      },
      onError: () => {
        toast.error("Failed to remove rule.");
        setPendingId(null);
      },
    });
  }

  return (
    <section aria-labelledby="rules-heading" className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
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
        {!showForm && (
          <Button
            size="sm"
            onClick={() => setShowForm(true)}
            data-ocid="add-rule-btn"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Rule
          </Button>
        )}
      </div>

      {/* Inline add form */}
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule, idx) => (
                  <tr
                    key={rule.id}
                    className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${idx % 2 === 1 ? "bg-muted/10" : ""}`}
                    data-ocid={`rule-row-${rule.id}`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {DAYS[rule.dayOfWeek] ?? `Day ${rule.dayOfWeek}`}
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
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => setPendingId(rule.id)}
                        disabled={isDeleting}
                        aria-label={`Delete ${DAYS[rule.dayOfWeek]} rule`}
                        data-ocid={`delete-rule-btn-${rule.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!pendingId}
        onOpenChange={(open) => !open && setPendingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Remove Availability Rule
            </AlertDialogTitle>
            <AlertDialogDescription>
              This rule will be permanently deleted and its time slots will no
              longer be available for new bookings. Existing confirmed bookings
              are not affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="rule-cancel-delete">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="rule-confirm-delete-btn"
            >
              Remove Rule
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

// ── Blocked Dates Section ──────────────────────────────────────────────────────

function BlockedDatesSection() {
  const { data: blocked = [], isLoading } = useBlockedDates();
  const { mutate: addBlocked, isPending: isAdding } = useAddBlockedDate();
  const { mutate: removeBlocked, isPending: isRemoving } =
    useRemoveBlockedDate();

  const [showForm, setShowForm] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");
  const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null);

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
          toast.success("Date blocked.");
          setDateInput("");
          setReasonInput("");
          setShowForm(false);
        },
        onError: () => toast.error("Failed to block date."),
      },
    );
  }

  function handleRemove() {
    if (!pendingRemoveId) return;
    removeBlocked(pendingRemoveId, {
      onSuccess: () => {
        toast.success("Date unblocked.");
        setPendingRemoveId(null);
      },
      onError: () => {
        toast.error("Failed to remove block.");
        setPendingRemoveId(null);
      },
    });
  }

  const sorted = [...blocked].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section aria-labelledby="blocked-heading" className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
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
        {!showForm && (
          <Button
            size="sm"
            onClick={() => setShowForm(true)}
            data-ocid="add-blocked-btn"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Block Date
          </Button>
        )}
      </div>

      {/* Inline add form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-accent/5 border border-accent/30 rounded-xl p-5 space-y-4 animate-slide-up"
        >
          <p className="font-display font-semibold text-foreground text-sm">
            Block a Date
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="blocked-date">Date</Label>
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
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowForm(false);
                setDateInput("");
                setReasonInput("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isAdding}
              data-ocid="blocked-submit-btn"
            >
              {isAdding ? "Blocking…" : "Block Date"}
            </Button>
          </div>
        </form>
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
              return (
                <li
                  key={bd.id}
                  className="flex items-center justify-between gap-4 px-4 py-3.5 hover:bg-muted/30 transition-colors"
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
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={() => setPendingRemoveId(bd.id)}
                    disabled={isRemoving}
                    aria-label={`Unblock ${formatted}`}
                    data-ocid={`unblock-btn-${bd.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Remove confirmation */}
      <AlertDialog
        open={!!pendingRemoveId}
        onOpenChange={(open) => !open && setPendingRemoveId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Remove Blocked Date
            </AlertDialogTitle>
            <AlertDialogDescription>
              This date will be unblocked and visitors will be able to book
              meetings again (subject to your availability rules).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="blocked-cancel-remove">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="blocked-confirm-remove-btn"
            >
              Unblock Date
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
          Configure when meetings can be booked at MaxFort School Rohini — set
          recurring weekly rules and block specific dates for holidays or
          closures.
        </p>
      </div>

      {/* Two sections separated by a divider */}
      <div className="space-y-10">
        <AvailabilityRulesSection />
        <hr className="border-border" />
        <BlockedDatesSection />
      </div>
    </AdminLayout>
  );
}
