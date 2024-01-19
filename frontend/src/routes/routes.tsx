import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/login/Login";
import ErrorPage from "../pages/errorPage/ErrorPage";
import HomePage from "../pages/LandingPage/HomePage";
import PrivateRoute from "./PrivateRoute";
import WelcomeTeam from "../pages/admin/createTeam/WelcomeTeam";
import Dashboard from "../pages/dashboard/Dashboard";
import Signup from "../pages/Signup/Signup";
import MyTeam from "../pages/MyTeam/MyTeam";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-members",
        element: <WelcomeTeam />,
      },
      {
        path: "/team-members",
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
