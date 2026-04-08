import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const {
    identity,
    loginStatus,
    isInitializing,
    isLoginSuccess,
    login,
    clear,
  } = useInternetIdentity();

  // User is authenticated if identity is available (either via stored identity or fresh login)
  const isAuthenticated = !!identity;
  const isLoading = isInitializing;

  return {
    identity,
    isAuthenticated,
    isLoading,
    loginStatus,
    isLoginSuccess,
    login,
    logout: clear,
  };
}
