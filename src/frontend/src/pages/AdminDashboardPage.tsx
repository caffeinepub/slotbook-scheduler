import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Monitor,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAdminBookings } from "../hooks/useBackend";
import type { Booking } from "../types";

export default function AdminDashboardPage() {
  const { data: bookings = [], isLoading } = useAdminBookings();

  const today = new Date().toISOString().split("T")[0];
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");
  const todayBookings = confirmed.filter((b) => b.date === today);
  const upcomingBookings = confirmed
    .filter((b) => b.date >= today)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.timeSlot.startTime.localeCompare(b.timeSlot.startTime);
    })
    .slice(0, 6);

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: Users,
      colorClass: "text-primary",
      bgClass: "bg-primary/10",
    },
    {
      label: "Confirmed",
      value: confirmed.length,
      icon: CheckCircle2,
      colorClass: "text-emerald-600",
      bgClass: "bg-emerald-50",
    },
    {
      label: "Today's Meetings",
      value: todayBookings.length,
      icon: Calendar,
      colorClass: "text-accent-foreground",
      bgClass: "bg-accent/20",
    },
    {
      label: "Cancelled",
      value: cancelled.length,
      icon: XCircle,
      colorClass: "text-destructive",
      bgClass: "bg-destructive/10",
    },
  ];

  if (isLoading) return <LoadingSpinner message="Loading dashboard…" />;

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Overview of meeting bookings at MaxFort School Rohini
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="flex-shrink-0">
            <Link to="/admin/bookings" data-ocid="dashboard-view-all-btn">
              <TrendingUp className="h-4 w-4 mr-1.5" />
              All Bookings
            </Link>
          </Button>
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="stats-grid"
        >
          {stats.map(({ label, value, icon: Icon, colorClass, bgClass }) => (
            <Card key={label} className="border-border shadow-subtle">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {label}
                    </p>
                    <p className="font-display text-3xl font-bold text-foreground">
                      {value}
                    </p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-lg ${bgClass} flex items-center justify-center`}
                  >
                    <Icon className={`h-5 w-5 ${colorClass}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's bookings */}
          <Card className="border-border shadow-subtle">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Today's Meetings
                </CardTitle>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {todayBookings.length} meeting
                  {todayBookings.length !== 1 ? "s" : ""}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {todayBookings.length === 0 ? (
                <div
                  className="text-center py-10 text-muted-foreground"
                  data-ocid="today-empty"
                >
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">
                    No meetings scheduled today
                  </p>
                  <p className="text-xs mt-1 opacity-70">
                    Enjoy your free day!
                  </p>
                </div>
              ) : (
                <ul
                  className="space-y-0 divide-y divide-border"
                  data-ocid="today-bookings-list"
                >
                  {todayBookings.map((b) => (
                    <DashboardRow key={b.id} booking={b} />
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Upcoming bookings */}
          <Card className="border-border shadow-subtle">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Upcoming Meetings
                </CardTitle>
                {upcomingBookings.length > 0 && (
                  <Link
                    to="/admin/bookings"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                    data-ocid="dashboard-upcoming-more"
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length === 0 ? (
                <div
                  className="text-center py-10 text-muted-foreground"
                  data-ocid="upcoming-empty"
                >
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">No upcoming meetings</p>
                  <p className="text-xs mt-1 opacity-70">
                    Bookings will appear here once confirmed
                  </p>
                </div>
              ) : (
                <ul
                  className="space-y-0 divide-y divide-border"
                  data-ocid="upcoming-bookings-list"
                >
                  {upcomingBookings.map((b) => (
                    <DashboardRow key={b.id} booking={b} showDate />
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick summary bar */}
        {bookings.length > 0 && (
          <Card className="border-border bg-muted/30">
            <CardContent className="pt-4 pb-4">
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" /> Meeting breakdown:
                </span>
                <span className="flex items-center gap-1.5">
                  <Monitor className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">
                    {bookings.filter((b) => b.meetingType === "online").length}
                  </span>
                  <span className="text-muted-foreground">Online</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-accent-foreground" />
                  <span className="font-medium text-foreground">
                    {
                      bookings.filter((b) => b.meetingType === "physical")
                        .length
                    }
                  </span>
                  <span className="text-muted-foreground">Physical</span>
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

function DashboardRow({
  booking: b,
  showDate = false,
}: {
  booking: Booking;
  showDate?: boolean;
}) {
  const formattedDate = new Date(`${b.date}T12:00:00`).toLocaleDateString(
    "en-IN",
    { month: "short", day: "numeric" },
  );
  return (
    <li
      className="flex items-center justify-between gap-3 py-2.5"
      data-ocid={`dashboard-booking-row-${b.id}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0 ${
            b.meetingType === "online" ? "bg-primary/10" : "bg-accent/20"
          }`}
        >
          {b.meetingType === "online" ? (
            <Monitor className="h-4 w-4 text-primary" />
          ) : (
            <MapPin className="h-4 w-4 text-accent-foreground" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {b.visitorName}
          </p>
          <p className="text-xs text-muted-foreground truncate">{b.topic}</p>
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        {showDate && (
          <p className="text-xs font-medium text-foreground">{formattedDate}</p>
        )}
        <p className="text-xs text-muted-foreground">{b.timeSlot.startTime}</p>
      </div>
    </li>
  );
}
