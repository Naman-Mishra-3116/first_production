import React from "react";
import Input from "../UI/Input";
import { useSelector } from "react-redux";
const UpdateEmail = () => {
  const email = useSelector((state) => state.valid.email);
  const onClickEmailChangeButton = async (event) => {
    try {
      event.preventDefault();
      const fd = new FormData(event.target);
      const { email } = Object.fromEntries(fd.entries());
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/auth/changeEmail", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const { success, error, message } = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <p className="text-center bg-secondary-back p-4 rounded-lg mt-[1rem] self-center text-bold">
          Change Email
        </p>
        <form onSubmit={onClickEmailChangeButton} className="mt-3 mb-4">
          <Input
            title="Email"
            name="email"
            id="email"
            type="email"
            placeholder={email != undefined ? email : ""}
          />

          <button
            type="submit"
            className="bg-[#1585e0] px-4 py-[10px] rounded-lg mt-[30px] hover:bg-[#369cef] mb-6"
          >
            Update Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmail;
