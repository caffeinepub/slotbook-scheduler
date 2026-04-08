import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 group transition-smooth"
            data-ocid="public-nav-brand"
          >
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground text-sm leading-tight">
                MaxFort School Rohini
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                Meeting Scheduler
              </p>
            </div>
          </Link>

          <Link
            to="/admin/login"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
            data-ocid="public-nav-admin-link"
          >
            Admin Login →
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
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
