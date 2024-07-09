/* eslint-disable @next/next/no-img-element */
import { useMyTeamsQuery } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";
import { ITeam } from "@/interfaces/team.interface";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateTeamModal from "../teamCreation/CreateTeam";

const Teams = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const [isOpen, setIsOpen] = useState(false);
  const { data: teamData } = useMyTeamsQuery(user?.id);

  return (
    <section className="p-5">
      <div className="lg:flex justify-between">
        <div>
          <h1 className="lg:text-3xl font-bold">
            Management Your Teams Professionally
          </h1>
        </div>
        <div>
          <button
            className="flex items-center mt-3 lg:mt-0 gap-2  border px-5 py-2 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <FaPlus /> <small>Create a team</small>
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-10 gap-10">
        {teamData?.data?.map((team: ITeam) => (
          <div
            key={team.id}
            className="border p-8 rounded-md border-blue-400 relative"
          >
            <img
              className="w-24 h-24 rounded-full border-2"
              src={team?.image}
              alt=""
            />
            <h2 className="text-2xl font-bold my-2">{team.name}</h2>
            <h4 className="text-xl font-semibold mb-3">{team.category}</h4>
            <p className="w-full mb-10">{team.description}</p>
            <div className="flex justify-between items-center gap-2 absolute bottom-4 w-full right-0 left-0 px-5">
              <p className="border font-medium px-2 lg:px-5 py-1 lg:py-2 rounded-md flex items-center gap-1">
                <span> Members: </span>
                <span>{Number(team.activeMembers?.length)}</span>
              </p>
              <p>
                <Link
                  className="border font-medium px-2  lg:px-5 py-2 rounded-md"
                  href={{
                    pathname: `/teams/${team.id}`,
                    query: {
                      team: team?.name,
                      category: team?.category,
                      collaborate: "Discussion",
                    },
                  }}
                >
                  View team
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>

      {teamData?.data?.length <= 0 && (
        <div className="text-2xl font-semibold flex flex-col gap-4 py-20">
          <h4>You haven&apos; have created any team yet</h4>
          <p>Your created team will be displayed here</p>
        </div>
      )}
      {isOpen && <CreateTeamModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default Teams;
