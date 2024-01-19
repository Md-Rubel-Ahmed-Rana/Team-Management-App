import React from "react";
import { useLoggedInUserQuery } from "../../../features/user/userApi";
import { IUser } from "../../../interfaces/user.interface";
import AdminTeams from "./AdminTeams";
import UserTeams from "./UserTeams";

const TeamPage = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  return <div>{user.role === "admin" ? <AdminTeams /> : <UserTeams />}</div>;
};

export default TeamPage;
