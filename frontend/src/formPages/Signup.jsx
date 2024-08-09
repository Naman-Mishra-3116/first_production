import React from "react";
import NavigationFor from "../UI/NavigationFor";
import { createToast } from "../../utils/createToast";
import { useNavigate } from "react-router-dom";
import { link } from "../../utils/backLink";
import PasswordInput from "../UI/PasswordInput";
import Input from "../UI/Input";
const Signup = () => {
  const navigateTo = useNavigate();

  const onSubmitSignupForm = async function (event) {
    event.preventDefault();
    try {
      const fd = new FormData(event.target);
      const { email, username, password } = Object.fromEntries(fd.entries());
      const response = await fetch(`${link}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      const { success, error, message } = await response.json();
      if (success) {
        createToast(message, "success");
        setTimeout(() => {
          navigateTo("/login");
        }, 3000);
      } else if (error) {
        createToast(error, "error");
      } else if (!success) {
        createToast(message, "error");
      }
    } catch (error) {
      createToast(error.message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <p className="text-center bg-secondary-back p-4 rounded-lg mt-[3rem] self-center">
          Create an Account
        </p>
        <form onSubmit={onSubmitSignupForm} className="mt-3">
          <Input title="Username" name="username" id="username" type="text" />
          <Input title="Email" name="email" id="email" type="email" />
          <PasswordInput id="pass" name="password" title={"Password"} />
          <button
            type="submit"
            className="bg-[#1585e0] px-4 py-[10px] rounded-lg mt-[30px] hover:bg-[#369cef] mb-4"
          >
            Sign Up
          </button>
        </form>
        <NavigationFor
          navigateTo={"login"}
          label={"Log In"}
          description={"Already have an account?"}
        />
      </div>
    </div>
  );
};

export default Signup;
