export const TAB_KEYS = ["home", "add-money", "components", "profile"] as const;

export const TAB_ROUTES: Record<string, string> = {
  home: "/",
  "add-money": "/add-money",
  components: "/components",
  profile: "/profile",
};

export const TAB_TITLES: Record<string, string> = {
  home: "Home",
  "add-money": "Add Money",
  components: "Components",
  profile: "Profile",
};
