import React from "react";
import { NavLink } from "react-router-dom";

const NavigationFor = ({ navigateTo, label, description }) => {
  return (
    <div className="flex justify-between mb-[0.5px] ml-2 mr-2">
      <p className="self-center text-slate-400">{description}</p>
      <NavLink
        to={`/${navigateTo}`}
        end
        className="hover:bg-[#1a1a1a] p-2 rounded-lg"
      >
        {label}
      </NavLink>
    </div>
  );
};

export default NavigationFor;
