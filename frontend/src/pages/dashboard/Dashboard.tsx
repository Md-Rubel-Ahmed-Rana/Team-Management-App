import { useAppSelector } from "../../redux/hooks";
import CreateTeam from "../admin/createTeam/CreateTeam";
import UserDashboard from "../user/UserDashboard";

const Dashboard = () => {
  const user: any = useAppSelector((state) => state?.user?.user);
  return (
    <div>{user?.role === "admin" ? <CreateTeam /> : <UserDashboard />}</div>
  );
};

export default Dashboard;
