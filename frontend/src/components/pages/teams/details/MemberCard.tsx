import { SocketContext } from "@/context/SocketContext";
import { useCancelPendingInvitationMutation } from "@/features/invitation";
import { useRemoveTeamMemberMutation } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";
import { ITeamDetailsMember } from "@/interfaces/team.interface";
import { IUser } from "@/interfaces/user.interface";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

type IProps = {
  member: ITeamDetailsMember;
  memberType: string;
  teamId: string;
};

const MemberCard = ({ member, memberType, teamId }: IProps) => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [removeMember] = useRemoveTeamMemberMutation();
  const [cancelInvitation] = useCancelPendingInvitationMutation();

  const handleDetectMemberType = () => {
    if (memberType === "active") {
      handleRemoveMember();
    }
    if (memberType === "pending") {
      handleCancelMemberInvitation();
    }
  };

  const handleRemoveMember = async () => {
    Swal.fire({
      title: "So sad",
      text: "Are you sure to remove this member?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result?.isConfirmed) {
        const removeHandler = async () => {
          const result: any = await removeMember({
            teamId: teamId,
            memberId: member?.id,
          });
          if (result?.data?.success) {
            toast.success(
              result?.data?.message || "Team member has been removed!"
            );
            socket.emit("notification", member?.id);
          }
          if (result?.error) {
            toast.error(
              result?.data?.message ||
                result?.error.data?.message ||
                "Failed to remove team member!"
            );
          }
        };
        removeHandler();
      }
    });
  };

  const handleCancelMemberInvitation = async () => {
    Swal.fire({
      title: "So sad",
      text: "Are you sure to cancel member invitation?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result?.isConfirmed) {
        const cancelHandler = async () => {
          const result: any = await cancelInvitation({
            teamId: teamId,
            memberId: member?.id,
          });
          if (result?.data?.success) {
            toast.success(
              result?.data?.message || "Pending member has been removed!"
            );
            socket.emit("notification", member?.id);
          } else {
            toast.error(
              result?.data?.message ||
                result?.error.data?.message ||
                "Failed to remove team member!"
            );
          }
        };
        cancelHandler();
      }
    });
  };

  return (
    <div key={member?.id} className="flex items-center gap-2">
      <img
        src={member?.profile_picture}
        alt={member?.name}
        className="rounded-full h-16 w-16 ring-1"
      />
      <div>
        <p className="text-lg font-medium flex items-center gap-3">
          <span>{member?.name}</span>

          {user?.id === member?.id ||
            (memberType !== "admin" && (
              <FaTrash
                onClick={handleDetectMemberType}
                className="cursor-pointer text-red-400"
                title="Click to remove/cancel member"
              />
            ))}
        </p>
        <p className="text-sm text-gray-600">{member?.email}</p>
      </div>
    </div>
  );
};

export default MemberCard;
