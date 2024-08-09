import React from "react";
import { createToast } from "../../utils/createToast";
import { useDispatch } from "react-redux";
import { authFunction } from "../../Store/authentication.store";
import { useNavigate } from "react-router-dom";
import { link } from "../../utils/backLink";
import PasswordInput from "../UI/PasswordInput";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const onClickChangePassword = async function (event) {
    event.preventDefault();
    try {
      const fd = new FormData(event.target);
      const { currentPassword, newPassword, confirmPassword } =
        Object.fromEntries(fd.entries());
      const token = localStorage.getItem("token");
      const response = await fetch(`${link}/auth/changePassword`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });
      const { success, error, message } = await response.json();
      if (success) {
        createToast(message, "success");
        localStorage.removeItem("token");
        dispatch(
          authFunction.setAllData({
            email: "",
            auth: false,
            token: "",
            name: "",
          })
        );
        setTimeout(() => {
          navigateTo("/");
          window.scrollTo({ behavior: "smooth", top: 0 });
        }, 3000);
      } else if (error) {
        createToast(message, "error");
      } else if (!success) {
        console.log(error, message);
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <p className="text-center bg-secondary-back p-4 rounded-lg mt-[1rem] self-center">
          Change Password
        </p>
        <form onSubmit={onClickChangePassword} className="mt-3">
          <PasswordInput
            title="Current Password"
            name="currentPassword"
            id="currentPassword"
          />
          <PasswordInput
            title="New Password"
            name="newPassword"
            id="newPassword"
          />
          <PasswordInput
            id="pass"
            name="confirmPassword"
            title={"Confirm New Password"}
          />
          <button
            type="submit"
            className="bg-[#1585e0] px-4 py-[10px] rounded-lg mt-[30px] hover:bg-[#369cef] mb-4"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
