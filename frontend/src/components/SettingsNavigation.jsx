import React from "react";
import { NavLink } from "react-router-dom";
import { styleFunctionForMiddleLink } from "../utils/navigationStyleFunction.function";
import { authFunction } from "../../Store/authentication.store";
import { showConfirm } from "react-confirm-prompt";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../utils/createToast";
import { link } from "../../utils/backLink";

const SettingsNavigation = () => {
  const token = useSelector((state) => state.valid.jwtToken);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      <p className="bg-secondary-back p-4 rounded-md self-center mt-8 mb-5">
        Account & Security Settings
      </p>
      <nav className="flex gap-4 self-center mb-5">
        <NavLink to={"/settings"} end className={styleFunctionForMiddleLink}>
          Change Email
        </NavLink>
        <NavLink
          to={"/settings/changePassword"}
          end
          className={styleFunctionForMiddleLink}
          onClick={() => {
            window.scrollTo({ behavior: "smooth", top: 300 });
          }}
        >
          Change Password
        </NavLink>
        <NavLink
          className={styleFunctionForMiddleLink}
          to={"/"}
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(
              authFunction.setAllData({
                email: "",
                auth: false,
                token: "",
                name: "",
              })
            );
          }}
        >
          Logout
        </NavLink>
        <button
          className={"hover:bg-red-600 p-2 rounded-md"}
          onClick={() => {
            showConfirm("Are you sure?", {
              description:
                "This action cannot be undone. All values associated with this account will be removed from our servers.",
              type: "warning",
              animation: "scale",
            }).then((answer) => {
              if (answer) {
                fetch(`${link}/auth/deleteUser`, {
                  method: "DELETE",
                  headers: {
                    Authorization: token,
                  },
                })
                  .then((resp) => resp.json())
                  .then(({ message, success, error }) => {
                    console.log(message);
                    localStorage.removeItem("token");
                    dispatch(
                      authFunction.setAllData({
                        email: "",
                        auth: false,
                        token: "",
                        name: "",
                      })
                    );
                    if (success) {
                      createToast("Account Deleted Successfully", "success");
                      setTimeout(() => {
                        navigateTo("/");
                      }, 3000);
                    } else if (error) {
                      createToast("Account could not be deleted", "error");
                    }
                  });
              }
            });
          }}
        >
          Delete Account
        </button>
      </nav>
    </div>
  );
};

export default SettingsNavigation;
