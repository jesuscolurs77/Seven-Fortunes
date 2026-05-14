export const TAB_KEYS = ["home", "add-money", "profile"] as const;

export const TAB_ROUTES: Record<string, string> = {
  home: "/",
  "add-money": "/(full)/add-funds",
  profile: "/profile",
};

export const TAB_TITLES: Record<string, string> = {
  home: "Home",
  "add-money": "Add Money",
  profile: "Profile",
};
