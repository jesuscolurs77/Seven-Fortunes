export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

let _currentUser: AuthUser | null = null;
let _hasCompletedOnboarding = false;

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
