import { useState } from "react";
import AddMemberModal from "../teams/addMember/AddMemberModal";
import { ITeam } from "../../interfaces/team.interface";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { IUser } from "../../interfaces/user.interface";
import { Link } from "react-router-dom";

const TeamDetails = ({ team }: { team: ITeam }) => {
  const { data: userData }: any = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const {
    name,
    category,
    description,
    image,
    admin,
    activeMembers,
    pendingMembers,
    createdAt,
  } = team;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 flex gap-5 shadow-md rounded-lg">
      <div className="w-2/6">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <div className="mt-4">
          <img
            src={image}
            alt={name}
            className="w-full h-48  border-2 p-4 rounded-lg"
          />
        </div>
      </div>
      <div className="w-4/5  flex flex-col gap-3">
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <p>
          <strong>Admin:</strong> {admin?.name} ({admin?.email})
        </p>
        <p>
          <strong>Active Members:</strong>{" "}
          {activeMembers?.map((member: any) => member?.name).join(", ")}
        </p>
        <p>
          <strong>Pending Members:</strong>{" "}
          {pendingMembers?.map((member: any) => member?.name).join(", ")}
        </p>
        <p>
          <strong>Created At:</strong> {createdAt?.toString()?.slice(0, 10)}
        </p>
        <div className="flex items-center gap-5">
          {
          user._id === admin._id &&  <p>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 mx-auto outline-none text-white border-2 px-5 py-2 rounded-lg"
          >
            Add members
          </button>
        </p>
        }
        <p>
          <Link
            className="bg-blue-300 font-medium px-5 py-2 rounded-md"
            to={`/teams/${team._id}`}
                >
            View team
          </Link>
        </p>
        </div>
        
        
      </div>
      {isOpen && (
        <AddMemberModal team={team} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default TeamDetails;
