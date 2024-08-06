import React from "react";
import { NavLink } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import MainFooter from "../components/MainFooter";

const ErrorPage = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-back rounded-md p-4 self-center w-[80%] ring-2 ring-slate-700 flex flex-col gap-5">
        <h1 className="w-[80%] self-center text-[35px]">404! Page Not Found</h1>
        <p>The Page you are trying to access does not exist! Please check the URL once</p>
        <NavLink
          to={"/"}
          end
          className={"bg-primary-blue self-center p-3 rounded-md mt-5"}
        >
          Go Back to Home Page
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
