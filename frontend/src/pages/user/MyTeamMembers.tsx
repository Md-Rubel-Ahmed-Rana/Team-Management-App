import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import AddMemberModal from "../admin/createTeam/AddMemberModal";
import {
  useGetActiveMembersQuery,
  useGetPendingMembersQuery,
} from "../../features/team/teamApi";

const MyTeamMembers = () => {
  const user: any = useAppSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("active");
  const team = user?.notifications[0];
  const { data: activeMembers } = useGetActiveMembersQuery(team?._id);
  const { data: pendingMembers } = useGetPendingMembersQuery(team?._id);

  const handleFilterMembers = (filter: string) => {
    if (filter === "active") {
      setStatus(filter);
    }
    if (filter === "pending") {
      setStatus(filter);
    }
  };

  return (
    <div className="my-10">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {team?.name} {`(${team?.category})`}{" "}
          </h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => handleFilterMembers("active")}
              className={`outline-none border-2 px-5 py-2 rounded-md ${
                status === "active"
                  ? "border-blue-500 text-blue-500"
                  : "text-slate-400"
              }`}
            >
              Active members{" "}
              {`(${
                activeMembers?.members?.length
                  ? activeMembers?.members?.length
                  : 0
              })`}
            </button>
            <button
              onClick={() => handleFilterMembers("pending")}
              className={`outline-none border-2 px-5 py-2 rounded-md ${
                status === "pending"
                  ? "border-blue-500 text-blue-500"
                  : "text-slate-400"
              }`}
            >
              Pending{" "}
              {`(${
                pendingMembers?.invitations?.length
                  ? pendingMembers?.invitations?.length
                  : 0
              })`}
            </button>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button className="gap-2 outline-none text-blue-400 border-2 border-blue-400 px-5 py-2 rounded-lg">
            Assign a group
          </button>
          <button
            disabled={user?.role === "user"}
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 outline-none text-white border-2 px-5 py-2 rounded-lg"
          >
            Add members
          </button>
        </div>
      </div>
      <div className="border-2 border-blue-400 rounded-lg my-10 p-5">
        <div className="flex flex-col p-10">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-sm font-light">
                  <thead className="text-left">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Role</th>
                    </tr>
                  </thead>
                  {status === "active" && (
                    <tbody className="text-left">
                      {activeMembers?.members &&
                        activeMembers?.members?.map((member: any) => (
                          <tr
                            key={member?.username}
                            className="border rounded-md"
                          >
                            <td className="px-6 py-4 flex items-center gap-5">
                              <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                                <h4>{member?.username?.slice(0, 1)}</h4>
                              </div>
                              <div>
                                <p>{member?.username}</p>
                                <p>{member?.email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">{team?.category}</td>
                            <td className="px-6 py-4">
                              {member?.status || "active"}
                            </td>
                            <td className="px-6 py-4">
                              {team?.category?.split(" ")[0]}
                              <span> Developer</span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                  {status === "pending" && (
                    <tbody className="text-left">
                      {pendingMembers?.invitations &&
                        pendingMembers?.invitations?.map((member: any) => (
                          <tr
                            key={member?.user?.username}
                            className="border rounded-md"
                          >
                            <td className="px-6 py-4 flex items-center gap-5">
                              <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                                <h4>{member?.user?.username?.slice(0, 1)}</h4>
                              </div>
                              <div>
                                <p>{member?.user?.username}</p>
                                <p>{member?.user?.email || member?.email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">{team?.category}</td>
                            <td className="px-6 py-4">
                              {member?.status || "active"}
                            </td>
                            <td className="px-6 py-4">
                              {team?.category?.split(" ")[0]}
                              <span> Developer</span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <AddMemberModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default MyTeamMembers;
