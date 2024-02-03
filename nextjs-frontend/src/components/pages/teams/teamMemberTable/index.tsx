/* eslint-disable @next/next/no-img-element */
import { ITeam } from "@/interfaces/team.interface";
import React from "react";

type Props = {
  team: ITeam;
};

const TeamMemberTable = ({ team }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block">
          <div className="overflow-hidden">
            <table className="min-w-full w-full text-sm font-light">
              <thead className="text-left">
                <tr className="border rounded-md">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Designation</th>
                </tr>
              </thead>
              <tbody className="text-left">
                <tr className="border rounded-md">
                  <td className="px-6 py-4 flex items-center gap-5">
                    <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                      <img
                        className="w-full h-full rounded-full"
                        src={
                          team?.admin?.profile_picture ||
                          "https://i.ibb.co/1MqspsL/user-Avater.png"
                        }
                        alt="profile image"
                      />
                    </div>
                    <div>
                      <p>{team?.admin?.name}</p>
                      <p>{team?.admin?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{team?.admin?.department}</td>
                  <td className="px-6 py-4">{team?.admin?.designation}</td>
                </tr>
                {team?.activeMembers?.length > 0 &&
                  team?.activeMembers?.map((member: any) => (
                    <tr key={member?._id} className="border rounded-md">
                      <td className="px-6 py-4 flex items-center gap-5">
                        <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                          <img
                            className="w-full h-full rounded-full"
                            src={
                              member?.profile_picture ||
                              "https://i.ibb.co/1MqspsL/user-Avater.png"
                            }
                            alt="profile image"
                          />
                        </div>
                        <div>
                          <p>{member?.name}</p>
                          <p>{member?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">{member?.department}</td>
                      <td className="px-6 py-4">{member?.designation}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberTable;
