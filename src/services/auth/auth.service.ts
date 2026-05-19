export type UserCountry = "US" | "PE";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  country: UserCountry;
}

let _currentUser: AuthUser | null = null;
let _hasCompletedOnboarding = false;

function inferCountryFromEmail(email: string): UserCountry {
  const normalized = email.trim().toLowerCase();
  if (normalized.endsWith(".pe") || /(^|[.@+])(pe|peru)([.@]|$)/.test(normalized)) {
    return "PE";
  }
  return "US";
}

export const authService = {
  async checkAuth(): Promise<AuthUser | null> {
    await new Promise((r) => setTimeout(r, 100));
    return _currentUser;
  },

  async login(email: string, _password: string): Promise<AuthUser> {
    await new Promise((r) => setTimeout(r, 500));
    const user: AuthUser = {
      id: "1",
      email,
      name: email.split("@")[0],
      country: inferCountryFromEmail(email),
    };
    _currentUser = user;
    return user;
  },

  async completeAccountSetup(): Promise<AuthUser> {
    await new Promise((r) => setTimeout(r, 200));
    const user: AuthUser = {
      id: "1",
      email: "user@example.com",
      name: "User",
      country: "US",
    };
    _currentUser = user;
    return user;
  },

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 100));
    _currentUser = null;
  },

  hasCompletedOnboarding(): boolean {
    return _hasCompletedOnboarding;
  },

  completeOnboarding(): void {
    _hasCompletedOnboarding = true;
  },
};
