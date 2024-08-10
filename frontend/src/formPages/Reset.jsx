import React from "react";
import Input from "../UI/Input";
import NavigationFor from "../UI/NavigationFor";
import { createToast } from "../../utils/createToast";
import { link } from "../../utils/backLink";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
const Reset = () => {

  const navigate = useNavigate();
  const onClickResetButton = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const { email } = Object.fromEntries(fd.entries());
    const response = await fetch(`${link}/forgetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const { message, success, error, link: resetLink } = await response.json();
    if (message === "User does not exist" && success === false) {
      createToast("User with specified email does not exist", "error");
    } else if (success === true && message !== "") {
      createToast(message, "success");
      emailjs
        .send(
          "service_03r4f6g",
          "template_vjtgmu4",
          {
            subject: "Password Reset Link",
            message: resetLink,
            to: email,
            sendername: "TypingTest.io",
          },
          "wRC-gybiq4TtzPcRh"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            setTimeout(()=>{
              navigate("/say/thankyouPage");
            },1000);
            
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <p className="text-center bg-secondary-back p-4 rounded-lg mt-[3rem] self-center">
          Reset Password
        </p>
        <form onSubmit={onClickResetButton} className="mt-3 mb-4">
          <Input title="Email" name="email" id="email" type="email" />

          <button
            type="submit"
            className="bg-[#1585e0] px-4 py-[10px] rounded-lg mt-[30px] hover:bg-[#369cef]"
          >
            Send Password Reset Link
          </button>
        </form>
        <NavigationFor
          navigateTo={"login"}
          label={"Go back"}
          description={"Want to try again?"}
        />
      </div>
    </div>
  );
};

export default Reset;
