import React from "react";
import NavigationTitle from "@/components/NavigationTitle";
import { Refresh } from "@mui/icons-material"

export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <NavigationTitle titleText={"Welcome to the app"} />
        <Refresh />
      </div>
    </main>
  );
}

