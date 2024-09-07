import { ITeam } from "@/interfaces/team.interface";
import Link from "next/link";
import { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddMemberToTeam from "../modals/AddMemberToTeam";
import RemoveMemberFromTeam from "../modals/RemoveMemberFromTeam";
import TeamDeleteModal from "../modals/TeamDeleteModal";
import dynamic from "next/dynamic";
import { MenuProps } from "antd";
import Swal from "sweetalert2";
import { useSendTeamLeaveRequestMutation } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";
import toast from "react-hot-toast";
import { SocketContext } from "@/context/SocketContext";
const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  team: ITeam;
};

const TeamCard = ({ team }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  const [isDeleteTeam, setIsDeleteTeam] = useState(false);
  const [leaveTeam] = useSendTeamLeaveRequestMutation();

  const leaveRequestIds = team.leaveRequests.map((member) => member?.id);

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
      <div className="border p-5 rounded-md border-blue-400 flex flex-col justify-between gap-1">
        <div className="flex justify-between items-start relative">
          <img
            className="w-24 h-24 rounded-full border-2"
            src={team?.image}
            alt={team?.name}
          />
          <Dropdown
            menu={{ items: actions }}
            placement="bottomRight"
            arrow
            className="border border-blue-600 px-2"
          >
            <Button type="text">
              <BsThreeDotsVertical className="text-xl" />
            </Button>
          </Dropdown>
        </div>
        <h2 className="text-xl lg:text-2xl font-bold">{team?.name}</h2>
        <h4 className="text-lg lg:text-xl font-medium">{team?.category}</h4>
        <h4>Active Members: {team.activeMembers.length} </h4>
        <h4>Pending Members: {team.pendingMembers.length} </h4>
        <h4>Projects: {team.projects.length} </h4>
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
