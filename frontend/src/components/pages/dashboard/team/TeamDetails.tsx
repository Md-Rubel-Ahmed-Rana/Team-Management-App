/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import AddMemberModal from "../../teams/addMember/AddMemberModal";
import Link from "next/link";
import { ITeam } from "@/interfaces/team.interface";
import RemoveMemberModal from "../../teams/addMember/RemoveMemberModal";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import Swal from "sweetalert2";
import {
  useGetMemberLeaveTeamRequestQuery,
  useLeaveTeamRequestMutation,
} from "@/features/team";

const TeamDetails = ({ team }: { team: ITeam }) => {
  const [isRemove, setIsRemove] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [leaveTeam] = useLeaveTeamRequestMutation();
  const { data: teamLeaveRequests } = useGetMemberLeaveTeamRequestQuery(
    user?.id
  );
  const teamIds = teamLeaveRequests?.data?.map((team: any) => team?.team);
  const {
    id,
    name,
    category,
    description,
    image,
    admin,
    activeMembers,
    pendingMembers,
    createdAt,
  } = team;

  const handleRequestToLeave = async () => {
    Swal.fire({
      title: "Oops sadness",
      text: "Are you sure to leave from this team",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yeas",
    }).then((result) => {
      if (result.isConfirmed) {
        const leaveData = {
          admin: admin?.id,
          team: id,
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

  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row md:gap-5 shadow-md rounded-lg">
      <div className="w-full md:w-2/6">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <div className="mt-4">
          <img
            src={image}
            alt={name}
            className="w-full h-48 border-2 p-4 rounded-lg"
          />
        </div>
      </div>
      <div className="w-full md:w-4/5 flex flex-col gap-3">
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
        <div className="flex flex-col md:flex-row items-center gap-5">
          {admin.id === user.id && (
            <>
              <p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="mx-auto outline-none border px-5 py-2 rounded-lg"
                >
                  Add members
                </button>
              </p>
              <p>
                <button
                  onClick={() => setIsRemove(true)}
                  className="mx-auto  border px-5 py-2 rounded-lg"
                >
                  Remove members
                </button>
              </p>
              <p>
                <Link
                  href={{
                    pathname: `/teams/edit-team/${team?.id}`,
                    query: {
                      id: team.id,
                      name: team?.name,
                      category: team?.category,
                      description: team?.description,
                    },
                  }}
                >
                  <button className="mx-auto  border px-5 py-2 rounded-lg">
                    Edit Team
                  </button>
                </Link>
              </p>
            </>
          )}
          {admin?.id !== user?.id && (
            <p>
              <button
                onClick={handleRequestToLeave}
                disabled={teamIds?.includes(id)}
                className={` ${
                  teamIds?.includes(id) ? "cursor-not-allowed" : "shadow-md"
                } mx-auto outline-none  border px-5 py-2 rounded-lg`}
              >
                {teamIds?.includes(id) ? "Requested" : "Request to leave"}
              </button>
            </p>
          )}

          <p>
            <Link
              href={{
                pathname: `/teams/${team?.id}`,
                query: {
                  team: team?.name,
                  category: team?.category,
                  collaborate: "Discussion",
                },
              }}
            >
              <button className="font-medium border px-5 py-2 rounded-md">
                View details
              </button>
            </Link>
          </p>
        </div>
      </div>
      {isOpen && (
        <AddMemberModal team={team} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      {isRemove && (
        <RemoveMemberModal
          team={team}
          isRemove={isRemove}
          setIsRemove={setIsRemove}
        />
      )}
    </div>
  );
};

export default TeamDetails;
