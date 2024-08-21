import { useLoggedInUserQuery } from "@/features/user";
import { ITeamDetailsMember } from "@/interfaces/team.interface";
import { IUser } from "@/interfaces/user.interface";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

type IProps = {
  member: ITeamDetailsMember;
  memberType: string;
};

const MemberCard = ({ member, memberType }: IProps) => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;

  const handleRemoveMember = () => {
    Swal.fire({
      position: "center",
      title: "Feature unavailable",
      text: "We are working on this feature. Please wait!",
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
                onClick={handleRemoveMember}
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
