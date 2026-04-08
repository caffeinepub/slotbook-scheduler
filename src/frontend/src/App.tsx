import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy pages
const BookingPage = lazy(() => import("./pages/BookingPage"));
const ConfirmationPage = lazy(() => import("./pages/ConfirmationPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AdminBookingsPage = lazy(() => import("./pages/AdminBookingsPage"));
const AdminAvailabilityPage = lazy(
  () => import("./pages/AdminAvailabilityPage"),
);

// Root route
const rootRoute = createRootRoute();

// Public routes
const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <BookingPage />
    </Suspense>
  ),
});

const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/confirmation",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <ConfirmationPage />
    </Suspense>
  ),
});

// Admin public
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminLoginPage />
    </Suspense>
  ),
});

// Admin protected
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<LoadingSpinner />}>
        <AdminDashboardPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/bookings",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<LoadingSpinner />}>
        <AdminBookingsPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const adminAvailabilityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/availability",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<LoadingSpinner />}>
        <AdminAvailabilityPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  bookingRoute,
  confirmationRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminBookingsRoute,
  adminAvailabilityRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
