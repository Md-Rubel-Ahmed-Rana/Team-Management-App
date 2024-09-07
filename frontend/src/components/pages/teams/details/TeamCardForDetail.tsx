import { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddMemberToTeam from "../modals/AddMemberToTeam";
import RemoveMemberFromTeam from "../modals/RemoveMemberFromTeam";
import TeamDeleteModal from "../modals/TeamDeleteModal";
import { FaFacebookMessenger } from "react-icons/fa";
import Link from "next/link";
import { ITeam } from "@/interfaces/team.interface";
import { useSendTeamLeaveRequestMutation } from "@/features/team";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useLoggedInUserQuery } from "@/features/user";
import { SocketContext } from "@/context/SocketContext";
import dynamic from "next/dynamic";
import { MenuProps } from "antd";

const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  team: ITeam;
};

const TeamCardForDetail = ({ team }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  const [isDeleteTeam, setIsDeleteTeam] = useState(false);

  const [leaveTeam] = useSendTeamLeaveRequestMutation();

  const leaveRequestIds = team?.leaveRequests?.map((member) => member?.id);

  const handleRequestToLeave = async () => {
    Swal.fire({
      title: "Oops sadness",
      text: "Are you sure to leave from this team?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        leaveHandler({
          teamId: team.id,
          memberId: user?.id,
        });
      }
    });
  };

  const leaveHandler = async (leaveData: {
    teamId: string;
    memberId: string;
  }) => {
    const result: any = await leaveTeam(leaveData);
    if (result?.data?.success) {
      toast.success(
        result?.data?.message || "Your leave request has been sent to admin"
      );
      socket.emit("notification", team?.admin?.id);
    } else {
      toast.success(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to send leave request!"
      );
    }
  };

  const actions: MenuProps["items"] = [
    {
      key: "1",
      label:
        user?.id === team?.admin?.id ? (
          <Button
            type="default"
            className="w-full"
            onClick={() => {
              setIsAddMember(true);
            }}
          >
            Add Member
          </Button>
        ) : null,
    },
    {
      key: "2",
      label:
        user?.id === team?.admin?.id ? (
          <Button
            className="w-full"
            type="default"
            onClick={() => {
              setIsRemoveMember(true);
            }}
          >
            Remove Member
          </Button>
        ) : null,
    },
    {
      key: "3",
      label:
        user?.id === team?.admin?.id ? (
          <Button className="w-full" type="default">
            <Link
              href={`/teams/edit-team/${team?.id}?id=${team.id}&name=${team?.name}&category=${team?.category}&description=${team?.description}`}
              className="w-full "
            >
              Edit Team
            </Link>
          </Button>
        ) : null,
    },
    {
      key: "4",
      label:
        user.id === team?.admin?.id ? (
          <Button
            className="w-full"
            type="default"
            onClick={() => {
              setIsDeleteTeam(true);
            }}
          >
            Delete
          </Button>
        ) : null,
    },
    {
      key: "5",
      label:
        user?.id !== team?.admin?.id && !leaveRequestIds?.includes(user?.id) ? (
          <Button
            className="w-full"
            type="default"
            onClick={handleRequestToLeave}
          >
            Request to leave
          </Button>
        ) : null,
    },
    {
      key: "6",
      label:
        user?.id !== team?.admin?.id && leaveRequestIds?.includes(user?.id) ? (
          <Button
            className="w-full"
            type="default"
            onClick={handleRequestToLeave}
          >
            Cancel leave request
          </Button>
        ) : null,
    },
  ].filter((action) => action.label !== null);

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
              <Dropdown
                menu={{ items: actions }}
                placement="bottom"
                arrow
                className="border border-blue-600 px-2"
              >
                <Button type="text">
                  <BsThreeDotsVertical className="text-xl" />
                </Button>
              </Dropdown>
              <Link
                href={`/teams/messages/${team?.id}?team_name=${team?.name}&team_category=${team?.category}&team_description=${team?.description}`}
              >
                <FaFacebookMessenger className="text-3xl text-blue-500" />
              </Link>
            </div>
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

export default TeamCardForDetail;
