import { useAppSelector } from "../../redux/hooks";
import TeamMembers from "../admin/createTeam/TeamMembers";
import MyTeamMembers from "../user/MyTeamMembers";

const MyTeam = () => {
  const user: any = useAppSelector((state) => state.user.user);
  return (
    <div>{user.role === "admin" ? <TeamMembers /> : <MyTeamMembers />}</div>
  );
};

export default MyTeam;
