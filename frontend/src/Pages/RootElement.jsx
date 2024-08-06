import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import MainFooter from "../components/MainFooter";

const RootElement = () => {
  return (
    <div>
      <MainNavigation />
      <Outlet />
      <MainFooter/>
    </div>
  );
};

export default RootElement;
