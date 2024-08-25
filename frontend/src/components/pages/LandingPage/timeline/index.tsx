import { howToWorkData } from "@/constants/howItWorkData";
import { TimelineItemProps, TimelineProps } from "antd";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { useMediaQuery } from "react-responsive";

const Timeline: ComponentType<TimelineProps> & {
  Item: ComponentType<TimelineItemProps>;
} = dynamic(() => import("antd/lib/timeline"), { ssr: false }) as any;

const Card = dynamic(() => import("antd/lib/card"), { ssr: false });

const Roadmap = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="overflow-hidden px-4">
      <h1 className="text-2xl text-center font-semibold pb-10">
        How Team Manager Works
      </h1>
      <Timeline mode={isMobile ? "left" : "alternate"}>
        {howToWorkData.map((mission) => (
          <Timeline.Item
            key={mission.mission}
            position={
              isMobile ? "left" : mission.mission % 2 === 0 ? "left" : "right"
            }
          >
            <Card
              data-aos={mission.animation}
              title={`Step ${mission.mission}: ${mission.title}`}
              className={`shadow-md font-sans`}
            >
              <ul>
                {mission.description.map((item, index) => (
                  <li
                    className="font-semibold font-sans text-xs lg:text-sm"
                    key={index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default Roadmap;
