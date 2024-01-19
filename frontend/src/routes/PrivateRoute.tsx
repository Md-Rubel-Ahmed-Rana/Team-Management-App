import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Loader from "../components/Loader";

type IProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: IProps) => {
  const userState = useAppSelector((state) => state);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  if (loading) {
    return <Loader />;
  }

  if (!userState?.user?.user?.email) {
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
