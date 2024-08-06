import React, { useEffect } from "react";
import { useState } from "react";

const SettingButton = ({
  title,
  listOfAction,
  settingFunction,
  defaultSettingIndex,
  storageReference,
  updateKey,
}) => {
  const [currentIndex, setIndex] = useState(defaultSettingIndex);

  const onClickButton = function (i) {
    try {
      setIndex(i);
      localStorage.setItem(storageReference, i);
      settingFunction(listOfAction[i].intent);
      if (storageReference != "showwpm" && storageReference != "showTimer") {
        updateKey((prev) => String(prev + 1));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="flex justify-between px-4 py-2 rounded-md w-[400px] items-center whitespace-nowrap cursor-pointer">
      <p>{title}</p>
      <div className="flex items-center gap-[8px]">
        {listOfAction.map((item, index) => {
          return (
            <span
              onClick={() => onClickButton(index)}
              key={item.text}
              className={`hover:text-white text-[#8f8f8f] text-md ${
                currentIndex === index
                  ? "bg-[#292929] text-white px-2 py-1 rounded-2xl"
                  : null
              }`}
            >
              {item.text}
            </span>
          );
        })}
      </div>
    </li>
  );
};

export default SettingButton;
