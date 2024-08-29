/* eslint-disable @next/next/no-img-element */
import InvitationSkeleton from "@/components/skeletons/InvitationSkeleton";
import { SocketContext } from "@/context/SocketContext";
import {
  useAcceptInvitationMutation,
  usePendingInvitationsQuery,
  useRejectInvitationMutation,
} from "@/features/invitation";
import { useLoggedInUserQuery } from "@/features/user";
import { ITeam } from "@/interfaces/team.interface";
import { IUser } from "@/interfaces/user.interface";
import React, { useContext } from "react";

import Swal from "sweetalert2";

const PendingInvitation = () => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData }: any = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data, isLoading } = usePendingInvitationsQuery(user?.id);
  const [acceptInvitation, { isLoading: isAccepting }] =
    useAcceptInvitationMutation();
  const [rejectInvitation, { isLoading: isRejecting }] =
    useRejectInvitationMutation();

  const handleAcceptInvitation = async (teamId: string) => {
    const result: any = await acceptInvitation({
      teamId,
      memberId: user?.id,
    });
    if (result?.data?.success) {
      socket.emit("notification", result?.data?.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleRejectInvitation = async (teamId: string) => {
    const result: any = await rejectInvitation({
      teamId,
      memberId: user.id,
    });
    if (result?.data?.success) {
      // send notification viw socket
      socket.emit("notification", result?.data?.data);

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
    <>
      {isLoading ? (
        <InvitationSkeleton />
      ) : (
        <>
          <div className="w-[76vw]">
            {data?.data?.map((team: ITeam) => {
              const {
                id,
                name,
                category,
                description,
                image,
                admin,
                createdAt,
              } = team;
              return (
                <div
                  key={id}
                  className="lg:p-4 flex flex-col md:flex-row gap-5 lg:shadow-md rounded-lg w-full"
                >
                  <div className="hidden lg:block w-full md:w-2/6 h-60 md:h-auto">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-60 object-cover border-2 lg:p-4 rounded-lg md:h-48"
                    />
                  </div>
                  <div className="block  lg:hidden w-20 h-20 mx-auto ring-2 rounded-full mt-2">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="w-full md:w-4/5 flex flex-col gap-2">
                    <h1 className="text-lg lg:text-2xl text-center lg:text-start font-semibold">
                      {name}
                    </h1>
                    <p>
                      <strong>Category:</strong> {category}
                    </p>
                    <p>
                      <strong>Description:</strong> {description}
                    </p>
                    <div>
                      <p>
                        <b>Admin:</b>
                      </p>
                      <div className="ml-2">
                        <p>Name: {admin?.name}</p>
                        <p>email: {admin?.email}</p>
                      </div>
                    </div>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {createdAt?.toString()?.slice(0, 10)}
                    </p>
                    <div className="flex  items-center gap-3">
                      <button
                        disabled={isAccepting || isRejecting}
                        onClick={() => handleAcceptInvitation(id)}
                        className={`px-5 py-2 rounded-md border ${
                          isAccepting || isRejecting
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600"
                        } text-white w-full lg:w-auto`}
                      >
                        {isAccepting ? "Accepting..." : "Accept"}
                      </button>
                      <button
                        disabled={isAccepting || isRejecting}
                        onClick={() => handleRejectInvitation(id)}
                        className={`px-5 py-2 rounded-md border ${
                          isAccepting || isRejecting
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600"
                        } text-white w-full lg:w-auto`}
                      >
                        {isRejecting ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-[6vh] lg:h-[80vh]">
            {data?.data?.length <= 0 && (
              <div className="h-[60vh] flex justify-center items-center">
                <h3 className="text-lg lg:text-2xl text-center font-semibold font-serif">
                  You don&apos; have any pending invitations
                </h3>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PendingInvitation;
