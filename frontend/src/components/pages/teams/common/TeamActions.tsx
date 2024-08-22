import useHandlePropagation from "@/hooks/useHandlePropagation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useLeaveTeamRequestMutation } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";

type Props = {
  setToggleAction: (value: boolean) => void;
  setIsAddMember: (value: boolean) => void;
  setIsRemoveMember: (value: boolean) => void;
  setIsDeleteTeam: (value: boolean) => void;
  team: any;
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
  const [leaveTeam] = useLeaveTeamRequestMutation();
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;

  const handleRequestToLeave = async () => {
    Swal.fire({
      title: "Oops sadness",
      text: "Are you sure to leave from this team?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const leaveData = {
          admin: team?.admin,
          team: team.id,
          member: user?.id,
        };
        const leaveHandler = async () => {
          const result: any = await leaveTeam(leaveData);
          if (result?.data?.success) {
            Swal.fire("Done!", `${result?.data?.message}`, "success");
          }
          if (result?.error) {
            Swal.fire("Done!", `${result?.error?.data?.message}`, "error");
          }
        };
        leaveHandler();
      }
    });
  };

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
          {user?.id === (team?.admin?.id || team?.admin) ? (
            <>
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
                  setToggleAction(false);
                }}
                className="bg-white w-full px-2 rounded-sm py-1 hover:bg-gray-100 text-start"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setToggleAction(false);
                handleRequestToLeave();
              }}
              className="bg-white w-full px-2 rounded-sm py-1 hover:bg-gray-100 text-start"
            >
              Request to leave
            </button>
          )}

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
