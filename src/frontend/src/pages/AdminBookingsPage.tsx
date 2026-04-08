import {
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Monitor,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "../components/AdminLayout";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAdminBookings, useCancelBooking } from "../hooks/useBackend";
import type { Booking } from "../types";

type FilterTab = "upcoming" | "today" | "all" | "cancelled";

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "today", label: "Today" },
  { id: "all", label: "All" },
  { id: "cancelled", label: "Cancelled" },
];

export default function AdminBookingsPage() {
  const { data: bookings = [], isLoading } = useAdminBookings();
  const cancelBooking = useCancelBooking();

  const [activeTab, setActiveTab] = useState<FilterTab>("upcoming");
  const [cancelDialogId, setCancelDialogId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const filtered = bookings
    .filter((b) => {
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
    })
    .sort((a, b) => {
      // Upcoming/today sorted chronologically; others by date desc
      if (activeTab === "upcoming" || activeTab === "today") {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.timeSlot.startTime.localeCompare(b.timeSlot.startTime);
      }
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return b.timeSlot.startTime.localeCompare(a.timeSlot.startTime);
    });

  const tabCounts: Record<FilterTab, number> = {
    upcoming: bookings.filter(
      (b) => b.status === "confirmed" && b.date >= today,
    ).length,
    today: bookings.filter((b) => b.status === "confirmed" && b.date === today)
      .length,
    all: bookings.length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const handleCancel = async () => {
    if (!cancelDialogId) return;
    try {
      await cancelBooking.mutateAsync({
        id: cancelDialogId,
        reason: cancelReason.trim() || undefined,
      });
      toast.success("Booking cancelled successfully");
      setCancelDialogId(null);
      setCancelReason("");
    } catch {
      toast.error("Could not cancel booking. Please try again.");
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading bookings…" />;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Bookings
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage all meeting bookings — {filtered.length} result
            {filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit"
          role="tablist"
          aria-label="Filter bookings"
          data-ocid="bookings-filter-tabs"
        >
          {FILTER_TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => setActiveTab(id)}
              data-ocid={`filter-tab-${id}`}
              className={`relative px-4 py-1.5 rounded-md text-sm font-medium transition-smooth flex items-center gap-1.5 ${
                activeTab === id
                  ? "bg-card text-foreground shadow-subtle"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {tabCounts[id] > 0 && (
                <span
                  className={`text-xs rounded-full px-1.5 py-0.5 leading-none ${
                    activeTab === id
                      ? "bg-primary text-primary-foreground"
                      : "bg-border text-muted-foreground"
                  }`}
                >
                  {tabCounts[id]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings list */}
        {filtered.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <div className="space-y-3" data-ocid="bookings-list">
            {filtered.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={() => {
                  setCancelDialogId(booking.id);
                  setCancelReason("");
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cancel confirmation dialog */}
      <Dialog
        open={!!cancelDialogId}
        onOpenChange={(open) => {
          if (!open) {
            setCancelDialogId(null);
            setCancelReason("");
          }
        }}
      >
        <DialogContent data-ocid="cancel-dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Cancel Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>
            <div>
              <Label
                htmlFor="cancel-reason"
                className="text-sm font-medium mb-1.5 block"
              >
                Reason{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="cancel-reason"
                placeholder="e.g. Schedule conflict, holiday…"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCancel();
                }}
                data-ocid="cancel-reason-input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialogId(null)}
              data-ocid="cancel-dialog-dismiss"
            >
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancelBooking.isPending}
              data-ocid="cancel-dialog-confirm"
            >
              {cancelBooking.isPending ? "Cancelling…" : "Cancel Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function EmptyState({ tab }: { tab: FilterTab }) {
  const messages: Record<FilterTab, { title: string; desc: string }> = {
    upcoming: {
      title: "No upcoming meetings",
      desc: "Confirmed meetings scheduled after today will appear here.",
    },
    today: {
      title: "No meetings today",
      desc: "You have a free schedule for today.",
    },
    all: {
      title: "No bookings yet",
      desc: "Meetings booked through the public page will appear here.",
    },
    cancelled: {
      title: "No cancelled bookings",
      desc: "Cancelled meetings will be listed here.",
    },
  };
  const { title, desc } = messages[tab];
  return (
    <div
      className="rounded-xl border border-border bg-card p-16 text-center"
      data-ocid="bookings-empty"
    >
      <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-30" />
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-1.5">{desc}</p>
    </div>
  );
}

function BookingCard({
  booking: b,
  onCancel,
}: {
  booking: Booking;
  onCancel: () => void;
}) {
  const formattedDate = new Date(`${b.date}T12:00:00`).toLocaleDateString(
    "en-IN",
    { weekday: "short", year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <Card
      className="border-border shadow-subtle hover:border-primary/30 transition-smooth"
      data-ocid={`booking-card-${b.id}`}
    >
      <CardContent className="pt-4 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          {/* Left: icon + info */}
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                b.meetingType === "online" ? "bg-primary/10" : "bg-accent/20"
              }`}
            >
              {b.meetingType === "online" ? (
                <Monitor className="h-5 w-5 text-primary" />
              ) : (
                <MapPin className="h-5 w-5 text-accent-foreground" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-foreground text-sm">
                  {b.visitorName}
                </p>
                {/* Status badge */}
                <Badge
                  variant={b.status === "confirmed" ? "default" : "secondary"}
                  className="text-xs capitalize"
                  data-ocid={`booking-status-${b.id}`}
                >
                  {b.status === "confirmed" ? (
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {b.status}
                </Badge>
                {/* Meeting type badge */}
                <Badge
                  variant="outline"
                  className={`text-xs capitalize ${
                    b.meetingType === "online"
                      ? "border-primary/40 text-primary"
                      : "border-accent/40 text-accent-foreground"
                  }`}
                  data-ocid={`booking-type-${b.id}`}
                >
                  {b.meetingType === "online" ? "Online" : "Physical"}
                </Badge>
              </div>

              <p className="text-sm text-foreground mt-0.5 font-medium">
                {b.topic}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                <span
                  className="flex items-center gap-1"
                  title={b.visitorEmail}
                >
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate max-w-[200px]">
                    {b.visitorEmail}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  {b.timeSlot.startTime} – {b.timeSlot.endTime}
                </span>
              </div>

              {b.cancelReason && (
                <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                  <XCircle className="h-3 w-3 flex-shrink-0" />
                  Cancellation reason: {b.cancelReason}
                </p>
              )}
            </div>
          </div>

          {/* Right: cancel action */}
          {b.status === "confirmed" && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="text-destructive hover:text-destructive hover:border-destructive flex-shrink-0 self-start sm:self-center"
              data-ocid={`cancel-booking-btn-${b.id}`}
            >
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
