import React from "react";
const Input = ({ type, title, id, name, placeholder = "" }) => {
  return (
    <div className="flex flex-col gap-2 w-[350px] mt-4">
      <label htmlFor={id} className="text-left ml-2">
        {title}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        required
        className="bg-secondary-back p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1585e0] ring-2 ring-[#2b2b2b] mb-2"
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
