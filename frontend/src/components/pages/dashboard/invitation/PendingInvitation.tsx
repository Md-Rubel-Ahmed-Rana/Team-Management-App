/* eslint-disable @next/next/no-img-element */
import {
  useAcceptInvitationMutation,
  usePendingInvitationsQuery,
  useRejectInvitationMutation,
} from "@/features/invitation";
import { useLoggedInUserQuery } from "@/features/user";
import { ITeam } from "@/interfaces/team.interface";
import { IUser } from "@/interfaces/user.interface";
import React from "react";

import Swal from "sweetalert2";

const PendingInvitation = () => {
  const { data: userData }: any = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data } = usePendingInvitationsQuery(user?.id);
  const [acceptInvitation] = useAcceptInvitationMutation();
  const [rejectInvitation] = useRejectInvitationMutation();

  const handleAcceptInvitation = async (teamId: string) => {
    const result: any = await acceptInvitation({
      teamId,
      memberId: user?.id,
    });
    if (result?.data?.success) {
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
    <div>
      <div>
        {data?.data?.map((team: ITeam) => {
          const {
            _id,
            name,
            category,
            description,
            image,
            admin,
            activeMembers,
            pendingMembers,
            createdAt,
          } = team;
          return (
            <div
              key={_id}
              className="p-4 flex flex-col md:flex-row gap-5 shadow-md rounded-lg"
            >
              <div className="w-full md:w-2/6 h-60 md:h-auto">
                <div>
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-60 object-cover border-2 p-4 rounded-lg md:h-48"
                  />
                </div>
              </div>
              <div className="w-full md:w-4/5 flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">{name}</h1>
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
                  {pendingMembers
                    ?.map((member: any) => member?.name)
                    .join(", ")}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {createdAt?.toString()?.slice(0, 10)}
                </p>
                <div className="flex  items-center gap-3">
                  <button
                    onClick={() => handleAcceptInvitation(_id)}
                    className="px-5 py-2 rounded-md border"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectInvitation(_id)}
                    className="px-5 py-2 rounded-md border"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center h-screen">
        {data?.data?.length <= 0 && (
          <h3 className="text-3xl font-semibold font-serif">
            You don&apos; have any pending invitations
          </h3>
        )}
      </div>
    </div>
  );
};

export default PendingInvitation;
