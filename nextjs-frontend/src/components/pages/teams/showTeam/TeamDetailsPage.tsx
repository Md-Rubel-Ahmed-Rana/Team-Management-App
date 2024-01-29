/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import Announcement from "../collaborations/announcements/Announcement";
import Resources from "../collaborations/resources/Resources";
import Discussion from "../collaborations/discussions/Discussion";
import { useRouter } from "next/router";
import { useSingleTeamQuery } from "@/features/team";
import { ITeam } from "@/interfaces/team.interface";
import { TbSpeakerphone } from "react-icons/tb";
import { GrResources } from "react-icons/gr";
import { RiMessage2Line } from "react-icons/ri";
import { SocketContext } from "@/context/SocketContext";

const TeamDetailsPage = () => {
  const { socket }: any = useContext(SocketContext);
  const router = useRouter();
  const { data: teamData } = useSingleTeamQuery(router?.query?.id);
  const team: ITeam = teamData?.data;
  const [activeNav, setActiveNav] = useState<any>("Discussion");

  const handleChangeCollaborate = (text: string) => {
    setActiveNav(text);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, collaborate: text },
    });
  };

  // connect to socket room
  useEffect(() => {
    socket.emit("join-room", team?._id);
  }, [socket, team?._id]);

  useEffect(() => {
    setActiveNav(router?.query?.collaborate);
  }, [router?.query?.collaborate]);

  return (
    <div className="flex gap-5">
      <div className="w-3/5 border-r-2 flex flex-col gap-10 p-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">{team?.name}</h3>
          <h5 className="text-lg font-sans">{team?.category}</h5>
          <p className="text-sm font-light">{team?.description}</p>
        </div>
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
      </div>
      <div className="w-2/5">
        <nav className="p-4 shadow-md rounded-md">
          <ul className="flex justify-between">
            <li>
              <button
                onClick={() => handleChangeCollaborate("Announcement")}
                className={`${
                  activeNav === "Announcement" && "bg-gray-200 dark:bg-gray-600"
                }   px-4 py-2 flex items-center gap-2 text-xl rounded-md shadow-md`}
              >
                <TbSpeakerphone />
                <small>Announcement</small>
              </button>
            </li>
            <li>
              <button
                className={`${
                  activeNav === "Resources" && "bg-gray-200 dark:bg-gray-600"
                }   px-4 py-2 flex items-center gap-2 text-xl rounded-md shadow-md`}
                onClick={() => handleChangeCollaborate("Resources")}
              >
                <GrResources />
                <small>Resources</small>
              </button>
            </li>
            <li>
              <button
                className={`${
                  activeNav === "Discussion" && "bg-gray-200 dark:bg-gray-600"
                }   px-4 py-2 flex items-center gap-2 text-xl rounded-md shadow-md`}
                onClick={() => handleChangeCollaborate("Discussion")}
              >
                <RiMessage2Line />
                <small>Discussion</small>
              </button>
            </li>
          </ul>
        </nav>
        <div>
          {activeNav === "Announcement" && <Announcement teamId={team?._id} />}
          {activeNav === "Resources" && <Resources teamId={team?._id} />}
          {activeNav === "Discussion" && <Discussion teamId={team?._id} />}
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
