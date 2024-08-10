import React from "react";
import PasswordInput from "./../UI/PasswordInput";
import { createToast } from "../../utils/createToast";
import { useNavigate, useParams } from "react-router-dom";
import { link } from "../../utils/backLink";
const ResetPassword = () => {
  const { id, token } = useParams();
  const navigateTo = useNavigate();
  const onClickResetPasswordButton = async function (event) {
    event.preventDefault();
    try {
      const fd = new FormData(event.target);
      const { password, confirmPassword } = Object.fromEntries(fd.entries());
      if (password !== confirmPassword) {
        createToast("Passwords do not match", "error");
        return;
      } else if (
        String(password).length < 6 ||
        String(confirmPassword).length < 6
      ) {
        createToast("Passwords should contain atleast 6 characters", "error");
        return;
      }

      const response = await fetch(`${link}/resetPassword/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, confirmPassword }),
      });
      const { message, error, success } = await response.json();
      if (message === "Password reset Successfully!" && success === true) {
        createToast(message, "success");
        setTimeout(() => {
          navigateTo("/login");
        }, 1000);
      } else if (error && success === false) {
        createToast(message, "error");
      }
    } catch (error) {
      createToast(error.message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center mt-[3rem]">
      <div className="flex flex-col">
        <p className="text-center bg-secondary-back p-4 rounded-lg mt-[3rem] self-center">
          Reset Your Password
        </p>
        <form onSubmit={onClickResetPasswordButton} className="mt-3 mb-4">
          <PasswordInput title="Password" name="password" id="passwrod" />
          <PasswordInput
            id="pass"
            name="confirmPassword"
            title={"Confirm Password"}
          />
          <button
            type="submit"
            className="bg-[#1585e0] px-4 py-[10px] rounded-lg mt-[30px] hover:bg-[#369cef]"
          >
            Reset My Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
