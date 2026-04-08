import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Calendar,
  GraduationCap,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: BarChart3,
    ocid: "admin-nav-dashboard",
  },
  {
    to: "/admin/bookings",
    label: "Bookings",
    icon: Calendar,
    ocid: "admin-nav-bookings",
  },
  {
    to: "/admin/availability",
    label: "Availability",
    icon: Settings,
    ocid: "admin-nav-availability",
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { logout, identity } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const principalShort = identity
    ? `${identity.getPrincipal().toText().slice(0, 8)}…`
    : "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top nav */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="font-display font-semibold text-foreground text-sm leading-tight">
                MaxFort School Rohini
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav
            className="flex items-center gap-1"
            aria-label="Admin navigation"
          >
            {navItems.map(({ to, label, icon: Icon, ocid }) => {
              const isActive =
                to === "/admin"
                  ? currentPath === "/admin"
                  : currentPath.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={ocid}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User + logout */}
          <div className="flex items-center gap-2">
            {principalShort && (
              <span className="hidden md:block text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full font-mono">
                {principalShort}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-muted-foreground hover:text-destructive transition-colors"
              data-ocid="admin-logout-btn"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-1.5">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} MaxFort School Rohini</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
