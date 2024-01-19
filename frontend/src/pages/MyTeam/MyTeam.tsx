import TeamMembers from "../admin/createTeam/TeamMembers";
import MyTeamMembers from "../user/MyTeamMembers";

const MyTeam = () => {
  const user: any = {};
  return (
    <div>{user?.role === "admin" ? <TeamMembers /> : <MyTeamMembers />}</div>
  );
};

export default MyTeam;
