import React from "react";
import SettingButton from "./SettingButton";

const SettingButtonList = ({
  durationArray,
  setTime,
  wordTypeArray,
  setWordType,
  numbersArray,
  setNumber,
  punctuationArray,
  setPunc,
  hideWPMArray,
  setShowWPM,
  hideTimerArray,
  setShowTimer,
  updateKey,
}) => {
  return (
    <div>
      <ul className="flex flex-col gap-[2px] w-[400px]">
        <SettingButton
          listOfAction={durationArray}
          settingFunction={setTime}
          title={"Time Duration"}
          storageReference={"time"}
          defaultSettingIndex={+localStorage.getItem("time") ?? 2}
          updateKey={updateKey}
        />
        <SettingButton
          listOfAction={wordTypeArray}
          settingFunction={setWordType}
          title={"Word List"}
          storageReference={"word"}
          defaultSettingIndex={+localStorage.getItem("word") || 0}
          updateKey={updateKey}
        />
        <SettingButton
          listOfAction={numbersArray}
          settingFunction={setNumber}
          title={"Numbers"}
          storageReference={"number"}
          defaultSettingIndex={+localStorage.getItem("number") || 0}
          updateKey={updateKey}
        />
        <SettingButton
          listOfAction={punctuationArray}
          settingFunction={setPunc}
          title={"Punctuation"}
          storageReference={"punctuation"}
          defaultSettingIndex={+localStorage.getItem("punctuation") || 0}
          updateKey={updateKey}
        />
        <SettingButton
          listOfAction={hideWPMArray}
          settingFunction={setShowWPM}
          title={"Show WPM"}
          storageReference={"showwpm"}
          defaultSettingIndex={+localStorage.getItem("showwpm") || 0}
          updateKey={updateKey}
        />
        <SettingButton
          listOfAction={hideTimerArray}
          settingFunction={setShowTimer}
          title={"Show Timer"}
          storageReference={"showTimer"}
          defaultSettingIndex={+localStorage.getItem("showTimer") || 0}
          updateKey={updateKey}
        />

        <li className="flex justify-between px-4 py-2 rounded-md w-[400px]">
          <p>Language</p>
          <p>English</p>
        </li>
      </ul>
    </div>
  );
};

export default SettingButtonList;
