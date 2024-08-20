import useHandlePropagation from "@/hooks/useHandlePropagation";
import { useEffect, useRef, useState } from "react";
import AddMemberToTeam from "../modals/AddMemberToTeam";
import { ITeam } from "@/interfaces/team.interface";
import RemoveMemberFromTeam from "../modals/RemoveMemberFromTeam";
import TeamDeleteModal from "../modals/TeamDeleteModal";
import Link from "next/link";

type Props = {
  setToggleAction: (value: boolean) => void;
  setIsAddMember: (value: boolean) => void;
  setIsRemoveMember: (value: boolean) => void;
  setIsDeleteTeam: (value: boolean) => void;
  team: ITeam;
};

const TeamActions = ({
  setToggleAction,
  setIsAddMember,
  setIsDeleteTeam,
  setIsRemoveMember,
  team,
}: Props) => {
  const closeModal = useHandlePropagation();
  const modalRef = useRef(null);

  // handle close modal
  useEffect(() => {
    closeModal(modalRef, setToggleAction);
  }, []);
  return (
    <>
      <div
        ref={modalRef}
        className="p-3 bg-gray-200 absolute right-0 top-9 rounded-md"
      >
        <div className="flex flex-col justify-between  items-start gap-2">
          <button
            onClick={() => {
              setIsAddMember(true);
              setToggleAction(false);
            }}
            className="bg-white w-full px-2 rounded-sm py-1 hover:bg-gray-100 text-start"
          >
            Add Member
          </button>
          <button
            onClick={() => {
              setIsRemoveMember(true);
              setToggleAction(false);
            }}
            className="bg-white w-full px-2 rounded-sm py-1 hover:bg-gray-100 text-start"
          >
            Remove Member
          </button>
          <Link
            href={`/teams/edit-team/${team?.id}?id=${team.id}&name=${team?.name}&category=${team?.category}&description=${team?.description}`}
            className="bg-white w-full px-2 rounded-sm py-1 hover:bg-gray-100 text-start"
          >
            Edit Team
          </Link>
          <button
            onClick={() => {
              setIsDeleteTeam(true);
            }}
            className="bg-white w-full px-2 rounded-sm py-1 hover:bg-gray-100 text-start"
          >
            Delete
          </button>
          <button
            onClick={() => setToggleAction(false)}
            className="bg-white w-full px-2 rounded-sm py-1 hover:bg-gray-100 text-start"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default TeamActions;
