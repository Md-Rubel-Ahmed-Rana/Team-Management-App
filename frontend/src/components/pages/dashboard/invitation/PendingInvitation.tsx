/* eslint-disable @next/next/no-img-element */
import InvitationSkeleton from "@/components/skeletons/InvitationSkeleton";
import { usePendingInvitationsQuery } from "@/features/invitation";
import { useLoggedInUserQuery } from "@/features/user";
import { ITeam } from "@/interfaces/team.interface";
import { IUser } from "@/interfaces/user.interface";
import InviteActions from "./InviteActions";
import AdminInfo from "./AdminInfo";
import dynamic from "next/dynamic";
import TeamInfo from "./TeamInfo";
const Card = dynamic(() => import("antd/lib/card"), {
  ssr: false,
});

const PendingInvitation = () => {
  const { data: userData }: any = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data, isLoading } = usePendingInvitationsQuery(user?.id);
  const invitations = data?.data as ITeam[];

  return (
    <>
      {isLoading ? (
        <InvitationSkeleton />
      ) : (
        <div>
          <h4 className="text-lg lg:text-2xl font-semibold">
            Pending invitations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
            {invitations?.map((team: ITeam) => (
              <Card
                key={team?.id}
                cover={
                  <img
                    className="h-40 w-full"
                    alt="team logo"
                    src={team?.image}
                  />
                }
                actions={[
                  <InviteActions teamId={team?.id} adminId={team?.admin?.id} />,
                ]}
              >
                <TeamInfo team={team} />
                <AdminInfo admin={team?.admin} />
              </Card>
            ))}
          </div>
          {invitations?.length <= 0 && (
            <div className="h-screen flex justify-center items-center">
              <h3 className="text-lg lg:text-2xl text-center font-semibold font-serif">
                You don&apos; have any pending invitations
              </h3>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PendingInvitation;
