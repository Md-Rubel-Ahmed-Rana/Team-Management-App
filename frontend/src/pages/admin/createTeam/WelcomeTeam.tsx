import people from "../../../assets/people.jpeg";
import channel from "../../../assets/channel.png";
import faqs from "../../../assets/faqs.png";
import { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import {
  useGetActiveMembersQuery,
  useGetTeamsQuery,
  useGetPendingMembersQuery,
} from "../../../features/team/teamApi";
import { useAppSelector } from "../../../redux/hooks";

const WelcomeTeam = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user: any = useAppSelector((state) => state.user.user);
  const { data } = useGetTeamsQuery(user?._id);
  const team = data?.data[data?.data.length - 1];
  const { data: activeMembers } = useGetActiveMembersQuery(team?._id);
  const { data: pendingMembers } = useGetPendingMembersQuery(team?._id);

  return (
    <div className="my-10 p-5 lg:p-0">
      <div className="lg:flex text-center lg:text-start justify-between">
        <div>
          <h1 className="lg:text-3xl font-bold mb-3">
            {team?.name} {`(${team?.category})`}
          </h1>
          <div className="lg:flex gap-4 items-center">
            <button className="border-2 mb-2 lg:mb-0 px-5 py-2 rounded-md">
              Active members{" "}
              {`(${activeMembers?.length ? activeMembers?.length : 0})`}
            </button>
            <button className="border-2 mb-2 lg:mb-0 px-5 py-2 rounded-md">
              Pending{" "}
              {`(${
                pendingMembers?.invitations?.length
                  ? pendingMembers?.invitations?.length
                  : 0
              })`}
            </button>
          </div>
        </div>
        <div className="lg:flex gap-4 items-center">
          <button className="gap-2 mb-2 lg:mb-0 text-blue-400 border-2 border-blue-400 px-5 py-2 rounded-lg">
            Assign a group
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 mb-2 lg:mb-0 text-white border-2 px-5 py-2 rounded-lg"
          >
            Add members
          </button>
        </div>
      </div>
      <div className="lg:border-2 border-blue-400 rounded-lg my-10 lg:bg-orange-50 pt-5 pb-20">
        <div className="text-center">
          <h3 className="lg:text-3xl text-xl text-slate-400 font-bold">
            Welcome to the team!
          </h3>
          <p className="text-md text-slate-400">
            Here are some things for you to get started...
          </p>
        </div>
        <div className="lg:flex gap-10 lg:w-2/3 mx-auto my-10 text-center">
          <div className="border lg:border-0 bg-orange-100  lg:bg-orange-50 p-4 lg:p-0">
            <img className="rounded-full" src={people} alt="" />
            <button className="border bg-white mt-4 px-5 py-1 shadow-md">
              Add more people
            </button>
          </div>
          <div className="border lg:border-0 bg-orange-100  lg:bg-orange-50 p-4 lg:p-0 my-2 lg:my-0">
            <img className="rounded-full" src={channel} alt="" />
            <button className="border bg-white mt-4 lg:px-5 px-2 py-1 shadow-md">
              Create more channels
            </button>
          </div>
          <div className="border lg:border-0 bg-orange-100  lg:bg-orange-50 p-4 lg:p-0">
            <img className="rounded-full" src={faqs} alt="" />
            <button className="border bg-white mt-4 px-5 py-1 shadow-md">
              Open the FAQs
            </button>
          </div>
        </div>
      </div>
      {isOpen && <AddMemberModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default WelcomeTeam;
