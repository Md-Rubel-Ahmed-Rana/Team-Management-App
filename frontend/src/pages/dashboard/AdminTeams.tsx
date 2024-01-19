// src/components/AdminTeamDashboard.js
import React, { useState } from "react";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { useMyTeamsQuery } from "../../features/team/teamApi";
import { ITeam } from "../../interfaces/team.interface";
import AdminTeamDetails from "./AdminTeamDetails";
import CreateTeamModal from "../teams/teamCreation/CreateTeam";

const AdminTeamDashboard = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { data: teamData } = useMyTeamsQuery(user?._id);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col  gap-5 p-4">
      <div className="mt-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Create New Team
        </button>
      </div>
      {teamData?.data.map((team: ITeam) => (
        <AdminTeamDetails key={team._id} team={team} />
      ))}

      {isOpen && <CreateTeamModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default AdminTeamDashboard;
