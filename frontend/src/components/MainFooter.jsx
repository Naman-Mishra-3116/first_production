import React from "react";
import { IoLogoGithub } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
const year = new Date().getFullYear();

const MainFooter = () => {
  const ScrollToPrivacyPolicy = function () {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <div className="flex flex-col gap-4 mt-[700px]" id="CONTACTUS">
      <hr className="border-gray-700 border-1 mb-5" />
      <p className="text-md text-slate-400 mb-3 hover:underline hover:text-slate-200">
        Contact Us
      </p>
      <NavLink end onClick={ScrollToPrivacyPolicy} to={"/privacy"}>
        Privacy Policy
      </NavLink>
      <nav className="flex gap-7 self-center">
        <NavLink
          target="_blank"
          to={"https://x.com/mishr89057"}
          end
          className="hover:scale-110 duration-75 transition ease-in"
        >
          <FaTwitter color="white" size={30} />
        </NavLink>
        <NavLink
          target="_blank"
          onClick={() =>
            window.open(
              "https://mail.google.com/mail/?view=cm&fs=1&to=namanmishra3116@gmail.com",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="hover:scale-110 duration-75 transition ease-in"
          end
        >
          <SiGmail color="white" size={30} />
        </NavLink>
        <NavLink
          target="_blank"
          onClick={() =>
            window.open("https://github.com/Naman-Mishra-3116", "_blank")
          }
          className="hover:scale-110 duration-75 transition ease-in"
          end
        >
          <IoLogoGithub size={30} color="white" />
        </NavLink>
        <NavLink
          target="_blank"
          to={"https://www.linkedin.com/in/naman-mishra-082555265/"}
          className="hover:scale-110 duration-75 transition-transform ease-in"
          end
        >
          <FaLinkedin size={30} color={"white"} />
        </NavLink>
      </nav>
      <p className="text-md text-slate-400 hover:text-slate-200">
        Copyright &copy; {year} by{" "}
        <span className="text-[#1585e0] underline">Naman Mishra</span> &mdash;
        All rights reserved
      </p>
    </div>
  );
};

export default MainFooter;
