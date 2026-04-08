import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Monitor,
  User,
  Video,
} from "lucide-react";
import { PublicLayout } from "../components/PublicLayout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import type { Booking } from "../types";

export default function ConfirmationPage() {
  const navigate = useNavigate();

  const booking: Booking | null = (() => {
    try {
      const raw = sessionStorage.getItem("lastBooking");
      return raw ? (JSON.parse(raw) as Booking) : null;
    } catch {
      return null;
    }
  })();

  if (!booking) {
    return (
      <PublicLayout>
        <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-fade-in">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Calendar className="h-7 w-7 text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            No booking found
          </h2>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            It looks like there's no booking to confirm. Book a meeting to get
            started.
          </p>
          <Button
            onClick={() => navigate({ to: "/" })}
            data-ocid="confirmation-back-btn"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Book a Meeting
          </Button>
        </div>
      </PublicLayout>
    );
  }

  const formattedDate = new Date(`${booking.date}T12:00:00`).toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const isOnline = booking.meetingType === "online";

  return (
    <PublicLayout>
      <div className="max-w-xl mx-auto px-4 py-14 animate-slide-up">
        {/* Success Hero */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-5">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-accent flex items-center justify-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent-foreground" />
            </span>
          </div>

          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary font-medium px-3 py-1 text-xs uppercase tracking-wide"
            data-ocid="confirmation-status-badge"
          >
            ✓ Confirmed
          </Badge>

          <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            {isOnline
              ? "Your online meeting has been booked. A meeting link will be shared with you closer to the date."
              : "Your in-person meeting at MaxFort School Rohini has been scheduled. We look forward to seeing you!"}
          </p>
        </div>

        {/* Booking Summary Card */}
        <Card className="border-border shadow-subtle overflow-hidden">
          {/* Meeting type header band */}
          <div
            className={`px-6 py-3 flex items-center gap-3 ${
              isOnline
                ? "bg-primary/10 border-b border-primary/20"
                : "bg-accent/15 border-b border-accent/25"
            }`}
          >
            <div
              className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isOnline ? "bg-primary/15" : "bg-accent/25"
              }`}
            >
              {isOnline ? (
                <Video
                  className={`h-4 w-4 ${isOnline ? "text-primary" : "text-accent-foreground"}`}
                />
              ) : (
                <MapPin className="h-4 w-4 text-accent-foreground" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground text-sm truncate">
                {booking.topic}
              </p>
              <p className="text-xs text-muted-foreground">
                {isOnline
                  ? "Online Meeting"
                  : "In-Person Meeting · MaxFort School Rohini"}
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-xs capitalize border-border flex-shrink-0"
              data-ocid="confirmation-meeting-type"
            >
              {isOnline ? "Online" : "Physical"}
            </Badge>
          </div>

          <CardContent className="pt-6 pb-6 space-y-0">
            {/* Visitor info */}
            <div className="space-y-3 mb-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Visitor Details
              </p>
              <DetailRow
                icon={User}
                label="Name"
                value={booking.visitorName}
                id="confirmation-name"
              />
              <DetailRow
                icon={Mail}
                label="Email"
                value={booking.visitorEmail}
                id="confirmation-email"
              />
            </div>

            <Separator className="my-5" />

            {/* Schedule info */}
            <div className="space-y-3 mb-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Schedule
              </p>
              <DetailRow
                icon={Calendar}
                label="Date"
                value={formattedDate}
                id="confirmation-date"
              />
              <DetailRow
                icon={Clock}
                label="Time"
                value={`${booking.timeSlot.startTime} – ${booking.timeSlot.endTime}`}
                id="confirmation-time"
              />
            </div>

            <Separator className="my-5" />

            {/* Location / Meeting link info */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {isOnline ? "Meeting Details" : "Location"}
              </p>

              {isOnline ? (
                <div className="flex items-start gap-3 text-sm">
                  <Monitor className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-foreground font-medium">
                      Online (Video Call)
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                      A meeting link will be sent to{" "}
                      <span className="text-primary font-medium">
                        {booking.visitorEmail}
                      </span>{" "}
                      before the meeting.
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-start gap-3 text-sm"
                  data-ocid="confirmation-location"
                >
                  <MapPin className="h-4 w-4 text-accent-foreground mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-foreground font-medium">
                      MaxFort School, Rohini
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                      Sector 9, Rohini, Delhi – 110085
                    </p>
                    <a
                      href="https://maps.google.com/?q=MaxFort+School+Rohini+Sector+9+Delhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline mt-1 inline-block"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Note for online meetings */}
        {isOnline && (
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex gap-3 items-start animate-fade-in">
            <Monitor className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-foreground leading-relaxed">
              <span className="font-semibold">What's next?</span> Our team will
              send a video call link to your email at least 1 hour before the
              meeting time.
            </p>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate({ to: "/" })}
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth flex-1 sm:flex-none sm:min-w-40"
            data-ocid="confirmation-new-booking-btn"
          >
            Book Another Meeting
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 flex-1 sm:flex-none sm:min-w-32"
            data-ocid="confirmation-home-btn"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  id,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  id?: string;
}) {
  return (
    <div className="flex items-start gap-3 text-sm" data-ocid={id}>
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
      <div className="min-w-0 flex items-baseline gap-1.5 flex-wrap">
        <span className="text-muted-foreground">{label}:</span>
        <span className="text-foreground font-medium break-words">{value}</span>
      </div>
    </div>
  );
}
