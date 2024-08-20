import { ITeam } from "@/interfaces/team.interface";
import Link from "next/link";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TeamActions from "./TeamActions";
import AddMemberToTeam from "../modals/AddMemberToTeam";
import RemoveMemberFromTeam from "../modals/RemoveMemberFromTeam";
import TeamDeleteModal from "../modals/TeamDeleteModal";
import { IUser } from "@/interfaces/user.interface";

type Props = {
  team: ITeam;
  admin: IUser;
};

const TeamCard = ({ team, admin }: Props) => {
  const [toggleAction, setToggleAction] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  const [isDeleteTeam, setIsDeleteTeam] = useState(false);
  return (
    <>
      <div className="border p-5 rounded-md border-blue-400 flex flex-col justify-between gap-1">
        <div className="flex justify-between items-start relative">
          <img
            className="w-24 h-24 rounded-full border-2"
            src={team?.image}
            alt={team?.name}
          />
          {admin?.id === team?.admin?.id && (
            <button
              onClick={() => setToggleAction(true)}
              className="border px-2 py-1 rounded-sm"
            >
              <BsThreeDotsVertical className="text-xl" />
            </button>
          )}

          {toggleAction && (
            <TeamActions
              setToggleAction={setToggleAction}
              team={team}
              setIsAddMember={setIsAddMember}
              setIsDeleteTeam={setIsDeleteTeam}
              setIsRemoveMember={setIsRemoveMember}
            />
          )}
        </div>
        <h2 className="text-xl lg:text-2xl font-bold">{team?.name}</h2>
        <h4 className="text-lg lg:text-xl font-medium">{team?.category}</h4>
        <h4>Active Members: 0 </h4>
        <h4>Pending Members: 0</h4>
        <h4>Projects: 0</h4>
        <p className="text-gray-600">{team?.description}</p>
        <div className="flex justify-between gap-2 lg:gap-4 mt-2">
          <Link
            href={`/teams/details/${team.id}?team_name=${team.name}&team_category=${team.category}&team_description=${team.description}`}
            className="bg-blue-500 rounded-md w-full text-center text-white py-2 hover:bg-blue-600 transition"
          >
            Details
          </Link>
          <Link
            href={`/teams/messages/${team.id}?team_name=${team.name}&team_category=${team.category}&team_description=${team.description}`}
            className="bg-blue-500 rounded-md w-full text-center text-white py-2 hover:bg-blue-600 transition"
          >
            Messages
          </Link>
        </div>
      </div>

      {/* open modal to add new member  */}
      {isAddMember && (
        <AddMemberToTeam
          isOpen={isAddMember}
          setIsOpen={setIsAddMember}
          team={team}
        />
      )}

      {/* open modal to remove member  */}
      {isRemoveMember && (
        <RemoveMemberFromTeam
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          team={team}
        />
      )}

      {/* open modal to delete team  */}
      {isDeleteTeam && (
        <TeamDeleteModal
          modalOpen={isDeleteTeam}
          setModalOpen={setIsDeleteTeam}
          teamId={team.id}
          teamName={team.name}
        />
      )}
    </>
  );
};

export default TeamCard;
