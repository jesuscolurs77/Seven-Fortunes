import React from "react";

import HomePE from "@/screens/home/HomePE";
import HomeUS from "@/screens/home/HomeUS";
import { useAuth } from "@/providers/AuthProvider";

export default function HomeScreen() {
  const { user } = useAuth();

  if (user?.country === "PE") {
    return <HomePE />;
  }

  return <HomeUS />;
}
