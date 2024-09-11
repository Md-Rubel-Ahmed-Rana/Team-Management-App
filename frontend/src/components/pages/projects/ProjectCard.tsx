import { IProject } from "@/interfaces/project.interface";
import moment from "moment";
import Link from "next/link";
import { IUser } from "@/interfaces/user.interface";
import { useGetSingleTeamQuery } from "@/features/team";
import SingleLineSkeleton from "@/components/skeletons/SingleLineSkeleton";
import { ITeam } from "@/interfaces/team.interface";
import ProjectActions from "./ProjectActions";

type Props = {
  project: IProject;
  admin: IUser;
};

const ProjectCard = ({ project }: Props) => {
  const { id, name, category, team, members, tasks, createdAt } = project;
  const { data, isLoading } = useGetSingleTeamQuery(team);
  const singleTeam = data?.data as ITeam;

  return (
    <>
      <div className="border border-gray-500 p-2 lg:p-5 rounded-md flex flex-col justify-between gap-1">
        <div className="flex justify-between items-start relative">
          <span className="font-semibold">{name}</span>
          <ProjectActions project={project} />
        </div>
        <h6 className="font-sans text-gray-500">{category}</h6>
        <h5>
          {isLoading ? <SingleLineSkeleton /> : `Team: ${singleTeam?.name}`}
        </h5>
        <h5>
          {isLoading ? (
            <SingleLineSkeleton />
          ) : (
            `Admin: ${singleTeam?.admin?.name}`
          )}
        </h5>
        <p>Tasks: {tasks} </p>
        <p>Members: {members?.length} </p>
        <p className="flex items-center gap-1">
          <span> Created:</span>
          <span className="text-sm text-gray-500">
            {moment(createdAt).fromNow()}
          </span>
        </p>
        <div className="flex justify-between items-center gap-2 mt-2">
          <Link
            href={`/tasks/${id}?project_name=${name}&project_id=${id}&project_category=${category}`}
            className="bg-blue-500 hover:bg-blue-600  px-2 py-2 text-center rounded-md text-white w-full"
          >
            All tasks
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
