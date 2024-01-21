import { useState } from "react";
import { useSingleTeamQuery } from "../../../features/team/teamApi";
import AddMemberModal from "../addMember/AddMemberModal";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../interfaces/user.interface";
import { useLoggedInUserQuery } from "../../../features/user/userApi";
import {
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} from "../../../features/invitation/invitationApi";
import Swal from "sweetalert2";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: teamData } = useSingleTeamQuery(id);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("active");
  const team = teamData?.data;

  const handleFilterMembers = (filter: string) => {
    if (filter === "active") {
      setStatus(filter);
    }
    if (filter === "pending") {
      setStatus(filter);
    }
  };

  const [acceptInvitation] = useAcceptInvitationMutation();
  const [rejectInvitation] = useRejectInvitationMutation();

  const handleAcceptInvitation = async () => {
    const result: any = await acceptInvitation({
      teamId: team._id,
      memberId: user._id,
    });
    if (result?.data?.success) {
      setStatus("active");
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleRejectInvitation = async () => {
    const result: any = await rejectInvitation({
      teamId: team._id,
      memberId: user._id,
    });
    if (result?.data?.success) {
      navigate("/teams");
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="my-10 p-5 lg:p-0">
      <div className="lg:flex justify-between">
        <div>
          <h1 className="lg:text-3xl font-bold mb-3">
            {team?.name} {`(${team?.category})`}{" "}
          </h1>
          <div className="lg:flex gap-4 text-center items-center">
            <button
              onClick={() => handleFilterMembers("active")}
              className={`outline-none mb-2 lg:mb-0 border-2 px-5 py-2 rounded-md ${
                status === "active"
                  ? "border-blue-500 text-blue-500"
                  : "text-slate-400"
              }`}
            >
              Active members{" "}
              {`(${
                team?.activeMembers?.length ? team?.activeMembers?.length : 0
              })`}
            </button>
            <button
              onClick={() => handleFilterMembers("pending")}
              className={`outline-none mb-2 lg:mb-0 border-2 px-5 py-2 rounded-md ${
                status === "pending"
                  ? "border-blue-500 text-blue-500"
                  : "text-slate-400"
              }`}
            >
              Pending {`(${team?.pendingMembers?.length || 0})`}
            </button>
          </div>
        </div>
        <div className="lg:flex gap-4 text-center items-center">
          <button className="gap-2 mb-2 lg:mb-0 outline-none text-blue-400 border-2 border-blue-400 px-5 py-2 rounded-lg">
            Chat
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 mx-auto outline-none text-white border-2 px-5 py-2 rounded-lg"
          >
            Add members
          </button>
        </div>
      </div>
      <div className="border-2 border-blue-400 rounded-lg my-10 p-5">
        <div className="flex flex-col lg:p-10">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-sm font-light">
                  <thead className="text-left">
                    <tr className="border rounded-md">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  {status === "active" && (
                    <tbody className="text-left">
                      {team?.activeMembers?.length > 0 &&
                        team?.activeMembers?.map((member: IUser) => (
                          <tr key={member._id} className="border rounded-md">
                            <td className="px-6 py-4 flex items-center gap-5">
                              <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={
                                    member.profile_picture ||
                                    "https://i.ibb.co/1MqspsL/user-Avater.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <div>
                                <p>{member?.name}</p>
                                <p>{member?.email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">{member?.department}</td>
                            <td className="px-6 py-4">Pending</td>
                            <td className="px-6 py-4">{member?.designation}</td>
                            <td className="px-6 py-4">
                              <button className="bg-blue-200 px-3 py-1 rounded-md font-semibold">
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                  {status === "pending" && (
                    <tbody className="text-left">
                      {team?.pendingMembers?.length > 0 &&
                        team?.pendingMembers?.map((member: IUser) => (
                          <tr key={member._id} className="border rounded-md">
                            <td className="px-6 py-4 flex items-center gap-5">
                              <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={
                                    member.profile_picture ||
                                    "https://i.ibb.co/1MqspsL/user-Avater.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <div>
                                <p>{member?.name}</p>
                                <p>{member?.email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">{member?.department}</td>
                            <td className="px-6 py-4">Pending</td>
                            <td className="px-6 py-4">{member?.designation}</td>
                            {user?.role === "user" &&
                              user._id === member._id && (
                                <>
                                  <td className="px-6 py-4">
                                    <button
                                      onClick={handleAcceptInvitation}
                                      className="bg-blue-200 px-3 py-1 rounded-md font-semibold"
                                    >
                                      Accept
                                    </button>
                                  </td>
                                  <td className="px-6 py-4">
                                    <button
                                      onClick={handleRejectInvitation}
                                      className="bg-red-300 px-3 py-1 rounded-md font-semibold"
                                    >
                                      Reject
                                    </button>
                                  </td>
                                </>
                              )}
                            {user?.role === "admin" && (
                              <td className="px-6 py-4">
                                <button className="bg-blue-200 px-3 py-1 rounded-md font-semibold">
                                  Remove
                                </button>
                              </td>
                            )}
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
      {isOpen && (
        <AddMemberModal team={team} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default TeamDetails;
