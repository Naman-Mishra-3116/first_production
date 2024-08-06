import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../src/Pages/ErrorPage";
import About from "./Pages/About";
import Login from "./formPages/Login";
import Reset from "./formPages/Reset";
import RootElement from "../src/Pages/RootElement";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import LeaderBoard from "./Pages/LeaderBoard";
import HomePage from "./Pages/HomePage";
import SettingsPage from "./Stats/SettingsPage";
import StatsPage from "./Pages/StatsPage";
import UpdateEmail from "./formPages/UpdateEmail";
import ChangePassword from "./formPages/ChangePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./formPages/Signup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authFunction } from "../Store/authentication.store";
import { getId } from "./utils/getId";

function App() {
  const dispatch = useDispatch();
  const getLoginUserData = async function () {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(
          "http://localhost:5000/getLoggedUserInfo",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );
        const {
          success,
          error,
          data: { email, username },
        } = await response.json();
        if (success) {
          dispatch(
            authFunction.setAllData({
              email,
              auth: true,
              token,
              name: username,
            })
          );
        } else if (error) {
          localStorage.removeItem("token");
        } else if (!success) {
          console.log(success, error, email, username);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getLoginUserData();
  }, []);
  const [currentKey, setCurrentKey] = useState(getId());

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootElement />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage key={currentKey} updateKey={setCurrentKey} />,
        },
        { path: "/leaderboard", element: <LeaderBoard /> },
        { path: "/about", element: <About /> },
        { path: "/login", element: <Login /> },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/stats",
          element: <StatsPage />,
        },
        { path: "/reset", element: <Reset /> },
        { path: "/privacy", element: <PrivacyPolicy /> },
        {
          path: "/settings",
          element: <SettingsPage />,
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <UpdateEmail /> },
            { path: "/settings/changePassword", element: <ChangePassword /> },
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-left"
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        closeOnClick={true}
        closeButton={false}
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
}

export default App;
