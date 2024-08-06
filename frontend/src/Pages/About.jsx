import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col">
      <p className="mt-10 bg-secondary-back text-center px-4 py-2 self-center rounded-md mb-5">
        About
      </p>
      <div className="w-[80%] self-center mt-3">
        <p className="mt-4">Test Statistcs</p>
        <div className="flex flex-col gap-2 text-left bg-secondary-back p-4 mt-5 rounded-md">
          <p>
            Correct Characters &mdash; &nbsp;
            <span className="text-[#666565]">
              Number of characters in correctly typed words.
            </span>
          </p>
          <p>
            Incorrect Characters &mdash; &nbsp;
            <span className=" text-[#666565]">
              Number of characters in words with at least one incorrect
              character.
            </span>
          </p>
          <p>
            Words per Minute (WPM) &mdash; &nbsp;
            <span className=" text-[#666565]">
              Correct characters, divided by 5, and divided by the test duration
              in minutes.
            </span>
          </p>
          <p>
            Accuracy &mdash; &nbsp;
            <span className=" text-[#666565]">
              Number of characters in correctly typed words, divided by the
              number of characters in all words, as a percentage.
            </span>
          </p>
          <p>
            Raw WPM &mdash; &nbsp;
            <span className=" text-[#666565]">
              WPM for characters in all words, regardless of if they were
              correct or not.
            </span>
          </p>
        </div>
      </div>
      <div className="w-[80%] self-center mt-3">
        <p className="mt-4">Test Words</p>
        <div className="flex flex-col gap-2 text-left bg-secondary-back p-4 mt-5 rounded-md">
          <p>
            The default 'Simple' list of words used to generate a test is a
            collection 100 popular English words, derived from a few different
            sources. The 'Advanced' words list is the top 1000 most common
            English words, according to this{" "}
            <NavLink
              to={
                "https://1000mostcommonwords.com/1000-most-common-english-words/"
              }
              end
              target="_blank"
              className={"text-primary-blue"}
            >
              this site
            </NavLink>{" "}
            .
          </p>
        </div>
      </div>
      <div className="w-[80%] self-center mt-3">
        <p className="mt-4">Privacy Policy</p>
        <div className="flex flex-col gap-2 text-left bg-secondary-back p-4 mt-5 rounded-md">
          <p>
            Click{" "}
            <NavLink
              to={"/privacy"}
              end
              className={"text-primary-blue"}
              onClick={() => {
                window.scrollTo({ behavior: "smooth", top: 0 });
              }}
            >
              here
            </NavLink>{" "}
            to read TypingTest.io's privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
