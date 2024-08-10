import React from "react";

const Thankyou = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <p className="text-center bg-secondary-back p-4 rounded-lg mt-[3rem] self-center">
          Password Reset link will be sent to your email shortly.
        </p>
        <button
          className="bg-[#1585e0] px-4 py-[10px] rounded-lg mt-[30px] hover:bg-[#369cef]"
          onClick={() => {
            window.open("http://mail.google.com", "_blank");
          }}
        >
          Open Gmail
        </button>
      </div>
    </div>
  );
};

export default Thankyou;
