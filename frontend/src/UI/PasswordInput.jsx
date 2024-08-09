import React from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
const PasswordInput = ({ title, id, name, placeholder = "" }) => {
  const [showType, setShowType] = useState("password");
  const onClickEyeButton = () => {
    setShowType((prev) => (prev === "password" ? "text" : "password"));
  };
  return (
    <div className="flex flex-col gap-2 w-[350px] mt-4 relative">
      <label htmlFor={id} className="text-left ml-2">
        {title}
      </label>

      <input
        type={showType}
        name={name}
        id={id}
        required
        className="bg-secondary-back p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1585e0] ring-2 ring-[#2b2b2b] mb-2"
        placeholder={placeholder}
      />
      <span
        className="absolute top-[55%] tr right-4 h-[10px] w-[15px]"
        onClick={onClickEyeButton}
      >
        {showType === "text" ? <IoEye /> : <IoEyeOff />}
      </span>
    </div>
  );
};

export default PasswordInput;
