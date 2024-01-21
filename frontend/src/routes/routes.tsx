import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/login/Login";
import ErrorPage from "../pages/errorPage/ErrorPage";
import HomePage from "../pages/LandingPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import Signup from "../pages/Signup/Signup";
import TeamDetails from "../pages/teams/showTeam/TeamDetails";
import TeamPage from "../pages/teams/showTeam/TeamPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import EditTeamPage from "../pages/dashboard/EditTeam";
import FeaturesSection from "../pages/LandingPage/features/FeaturePage";
import CheckoutPage from "../pages/checkout/Checkout";
import PaymentSuccess from "../pages/checkout/Success";
import PaymentCancel from "../pages/checkout/Cancel";

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
        path: "/features",
        element: <FeaturesSection limit={100} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/teams",
        element: (
          <PrivateRoute>
            <TeamPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/teams/:id",
        element: (
          <PrivateRoute>
            <TeamDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-team/:id",
        element: (
          <PrivateRoute>
            <EditTeamPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
