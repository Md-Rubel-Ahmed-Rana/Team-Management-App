import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useLoggedInUserQuery } from "../features/user/userApi";

type IProps = {
  children: ReactNode;
};

const RoutePreventer = ({ children }: IProps) => {
  const { data, isLoading } = useLoggedInUserQuery({});
  const user = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  if (user?.email) {
    return <Navigate to="/dashboard" />;
  }
  return <div>{children}</div>;
};

export default RoutePreventer;
