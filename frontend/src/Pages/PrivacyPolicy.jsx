import React from "react";
import { NavLink } from "react-router-dom";
const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col" id="policy">
      <p className="mt-10 bg-secondary-back text-center px-4 py-2 self-center rounded-md mb-5">
        Privacy Policy
      </p>
      <div className="w-[80%] self-center mt-3">
        <p className="mt-4">What data do we Collect?</p>
        <div className="flex flex-col gap-2 text-left bg-secondary-back p-4 mt-5 rounded-md">
          <p className="mb-4">TypingTest.io collects the following data:</p>
          <p>&mdash; &nbsp; Your email address</p>
          <p>&mdash; &nbsp; Your Username</p>
          <p>&mdash; &nbsp; Your Test result</p>
          <p>&mdash; &nbsp; Your IP address</p>
        </div>
      </div>
      <div className="w-[80%] self-center mt-3">
        <p className="mt-4">How will we use your data?</p>
        <div className="flex flex-col gap-2 text-left bg-secondary-back p-4 mt-5 rounded-md">
          <p className="mb-4">
            TypingTest.io collects your data so that we can:
          </p>
          <p>
            &mdash; &nbsp; Save your test results so that you can view them
            later
          </p>
          <p>&mdash; &nbsp; Display your results on the leaderboards</p>
        </div>
      </div>
      <div className="w-[80%] self-center mt-3">
        <p className="mt-4">How do we store your data?</p>
        <div className="flex flex-col gap-2 text-left bg-secondary-back p-4 mt-5 rounded-md">
          <p className="mb-4">
            TypingTest.io securely stores your data in a MongoDB database, on a
            virtual private server.
          </p>
        </div>
      </div>
      <div className="w-[80%] self-center mt-3">
        <p className="mt-4">What are cookies?</p>
        <div className="flex flex-col gap-2 text-left bg-secondary-back p-4 mt-5 rounded-md">
          <p className="mb-4">
            Cookies are text files placed on your computer to collect standard
            Internet log information and visitor behaviour information. When you
            visit my website, we may collect information from you automatically
            through cookies or similar technology.
          </p>
          <p>
            For further information,{" "}
            <NavLink
              to={"https://www.termsfeed.com/blog/cookies/"}
              end
              target="_blank"
            >
              visit <span className="text-primary-blue">this site</span>
            </NavLink>{" "}
          </p>
        </div>
      </div>
      <div className="w-[80%] self-center mt-3">
        <p className="mt-4">How do we use cookies?</p>
        <div className="flex flex-col gap-2 text-left bg-secondary-back p-4 mt-5 rounded-md">
          <p>TypeingTest.io only uses cookies to keep you signed in.</p>
        </div>
      </div>
      <div className="w-[80%] self-center mt-3">
        <p className="mt-4">Contact Us</p>
        <div className="flex flex-col gap-2 text-left bg-secondary-back p-4 mt-5 rounded-md">
          <p>
            If you have any question about our privacy policy, the data we hold
            on you please do not hesitate to contact us find our contact details
            <NavLink
              onClick={() => {
                const contactSecton = document.getElementById("CONTACTUS");
                contactSecton.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="text-primary-blue">&nbsp; here</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
