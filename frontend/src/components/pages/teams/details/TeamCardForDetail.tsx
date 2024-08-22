import { ITeamDetails } from "@/interfaces/team.interface";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TeamActions from "../common/TeamActions";
import { useSingleTeamQuery } from "@/features/team";
import AddMemberToTeam from "../modals/AddMemberToTeam";
import RemoveMemberFromTeam from "../modals/RemoveMemberFromTeam";
import TeamDeleteModal from "../modals/TeamDeleteModal";
import { FaFacebookMessenger } from "react-icons/fa";
import Link from "next/link";

type Props = {
  team: ITeamDetails;
};

const TeamCardForDetail = ({ team }: Props) => {
  const { data: singleTeam } = useSingleTeamQuery(team?.id);
  const [toggleAction, setToggleAction] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  const [isDeleteTeam, setIsDeleteTeam] = useState(false);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center gap-4 lg:justify-start items-center">
        <div className="w-24 h-24 lg:mr-6">
          <img
            src={team?.image}
            alt={`${team?.name}-logo`}
            className="rounded-full ring-2 w-24 h-24"
          />
        </div>
        <div>
          <div className="flex lg:inline-flex  flex-col-reverse lg:flex-row items-center gap-2 relative">
            <h2 className="text-start  w-full mb-2 text-2xl font-bold">
              {team?.name}
            </h2>
            <div className="flex items-center gap-3">
              <button
                title="Team actions"
                onClick={() => setToggleAction(true)}
                className="border px-2 py-1 rounded-sm"
              >
                <BsThreeDotsVertical className="text-xl" />
              </button>
              <Link
                href={`/teams/messages/${team?.id}?team_name=${team?.name}&team_category=${team?.category}&team_description=${team?.description}`}
              >
                <FaFacebookMessenger className="text-3xl text-blue-500" />
              </Link>
            </div>

            {toggleAction && (
              <TeamActions
                setToggleAction={setToggleAction}
                team={singleTeam?.data}
                setIsAddMember={setIsAddMember}
                setIsDeleteTeam={setIsDeleteTeam}
                setIsRemoveMember={setIsRemoveMember}
              />
            )}
          </div>

          <p className="text-sm text-gray-600">{team?.category}</p>
          <p className="text-gray-800 mt-2">{team?.description}</p>
        </div>
      </div>
      {/* open modal to add new member  */}
      {isAddMember && (
        <AddMemberToTeam
          isOpen={isAddMember}
          setIsOpen={setIsAddMember}
          team={singleTeam?.data}
        />
      )}

      {/* open modal to remove member  */}
      {isRemoveMember && (
        <RemoveMemberFromTeam
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          team={singleTeam?.data}
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

export default TeamCardForDetail;
