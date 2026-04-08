import { useNavigate } from "@tanstack/react-router";
import { GraduationCap, LogIn, Shield } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useAuth } from "../hooks/useAuth";

export default function AdminLoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top accent band */}
      <div className="h-1.5 bg-primary" />

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm animate-slide-up">
          {/* Brand mark */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-subtle">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground text-center">
              MaxFort School Rohini
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Meeting Scheduler — Admin Portal
            </p>
          </div>

          <Card className="border-border shadow-subtle">
            <CardContent className="pt-6 pb-6 space-y-5">
              <div className="text-center space-y-1">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Admin Sign In
                </h2>
                <p className="text-sm text-muted-foreground">
                  Secure login using Internet Identity
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3 border border-border">
                <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Internet Identity provides secure, passwordless
                  authentication. Only authorized administrators can access this
                  area.
                </p>
              </div>

              <Button
                className="w-full gap-2"
                onClick={login}
                disabled={isLoading}
                data-ocid="admin-login-btn"
              >
                <LogIn className="h-4 w-4" />
                {isLoading ? "Connecting…" : "Login with Internet Identity"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Not an admin?{" "}
                <a
                  href="/"
                  className="text-primary hover:underline font-medium"
                >
                  Book a meeting instead
                </a>
              </p>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} MaxFort School Rohini. Built with{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
