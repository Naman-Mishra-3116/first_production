import React from "react";
import SettingsNavigation from "../components/SettingsNavigation";
import { Outlet } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div>
      <SettingsNavigation />
      <Outlet />
    </div>
  );
};

export default SettingsPage;
