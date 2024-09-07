import React from "react";
import type { CollapseProps } from "antd";
import { ITeam } from "@/interfaces/team.interface";
import { IProject } from "@/interfaces/project.interface";
import dynamic from "next/dynamic";
import TeamActionButtons from "./actions/TeamActionButtons";
import ProjectActionButtons from "./actions/ProjectActionButtons";
const Collapse: any = dynamic(() => import("antd/lib/collapse"), {
  ssr: false,
});

type Props = {
  item: ITeam | IProject;
  itemType: string;
};

const LeaveRequestList = ({ item, itemType }: Props) => {
  const items: CollapseProps["items"] = [
    {
      key: item?.id,
      label: (
        <div className="flex justify-between items-center">
          <span>{item?.name}</span>
          <span>Requests: {item?.leaveRequests?.length}</span>
        </div>
      ),
      children:
        item?.leaveRequests?.length > 0 ? (
          <div className="w-full">
            {item?.leaveRequests.map((member) => (
              <div
                className="flex justify-between items-center"
                key={member.id}
              >
                <h4 className="text-sm lg:text-lg font-semibold">
                  {member.name}
                </h4>
                {itemType === "team" ? (
                  <TeamActionButtons teamId={item?.id} memberId={member.id} />
                ) : (
                  <ProjectActionButtons
                    projectId={item?.id}
                    memberId={member.id}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No leave request</p>
        ),
    },
  ];

  return <Collapse items={items} className="lg:mr-10 lg:w-[70%] w-full" />;
};

export default LeaveRequestList;
