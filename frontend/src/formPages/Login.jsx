import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import NavigationFor from "../UI/NavigationFor";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../utils/createToast";
import { useDispatch } from "react-redux";
import { authFunction } from "../../Store/authentication.store";
import { link } from "../../utils/backLink.js";
import PasswordInput from "../UI/PasswordInput.jsx";

const Login = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const onClickLoginButton = async function (event) {
    event.preventDefault();
    try {
      const fd = new FormData(event.target);
      const { email, password } = Object.fromEntries(fd.entries());
      const response = await fetch(`${link}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const {
        message,
        success,
        jwtToken,
        email: UserEmail,
        name,
        error,
      } = await response.json();
      console.log({ message, success, jwtToken, UserEmail, name, error });
      if (success) {
        createToast(message, "success");
        setLoginSuccess(true);
        localStorage.setItem("token", jwtToken);
        dispatch(
          authFunction.setAllData({
            token: jwtToken,
            auth: success,
            name,
            email: UserEmail,
          })
        );
      } else if (!success) {
        createToast(message, "error");
      } else if (error) {
        createToast(error, "error");
      }
    } catch (error) {
      createToast(error.message, "error");
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    }
  }, [loginSuccess, navigateTo]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <p className="text-center bg-secondary-back p-4 rounded-lg mt-[3rem] self-center">
          Log In
        </p>
        <form onSubmit={onClickLoginButton} className="mt-3 mb-4">
          <Input title="Email" name="email" id="email" type="email" />
          <PasswordInput id="pass" name="password" title={"Password"} />
          <button
            type="submit"
            className="bg-[#1585e0] px-4 py-[10px] rounded-lg mt-[30px] hover:bg-[#369cef]"
          >
            Log In
          </button>
        </form>
        <NavigationFor
          navigateTo={"signup"}
          label={"Sign Up"}
          description={"Don't have an account?"}
        />
        <NavigationFor
          navigateTo={"reset"}
          label={"Reset"}
          description={"Forgot your password?"}
        />
      </div>
    </div>
  );
};

export default Login;
