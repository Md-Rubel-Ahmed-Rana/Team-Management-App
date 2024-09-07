import { IProject } from "@/interfaces/project.interface";
import moment from "moment";
import { useContext, useState } from "react";
import EditProjectModal from "./modals/EditProjectModal";
import Link from "next/link";
import AddMemberToProject from "./modals/AddMemberToProject";
import RemoveMemberFromProject from "./modals/RemoveMemberFromProject";
import { IUser } from "@/interfaces/user.interface";
import ProjectDeleteModal from "./modals/ProjectDeleteModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ITeam } from "@/interfaces/team.interface";
import { useGetSingleTeamQuery } from "@/features/team";
import SingleLineSkeleton from "@/components/skeletons/SingleLineSkeleton";
import Swal from "sweetalert2";
import { useSendProjectLeaveRequestMutation } from "@/features/project";
import toast from "react-hot-toast";
import { MenuProps } from "antd";
import { SocketContext } from "@/context/SocketContext";
import { useLoggedInUserQuery } from "@/features/user";
import dynamic from "next/dynamic";
const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  project: IProject;
  admin: IUser;
};

const ProjectCard = ({ project }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);

  const { id, name, category, team, members, tasks, createdAt } = project;
  const { data, isLoading } = useGetSingleTeamQuery(team);
  const singleTeam = data?.data as ITeam;

  const leaveRequestIds = project?.leaveRequests?.map((member) => member?.id);
  const [leaveRequest] = useSendProjectLeaveRequestMutation();

  const handleLeaveRequest = async () => {
    Swal.fire({
      title: "So sad",
      text: "Are you sure to leave from this project?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result?.isConfirmed) {
        handleSendLeaveRequest({
          projectId: project?.id,
          memberId: user?.id,
        });
      }
    });
  };

  const handleSendLeaveRequest = async (data: {
    projectId: string;
    memberId: string;
  }) => {
    const result: any = await leaveRequest(data);
    if (result?.data?.success) {
      toast.success(
        result?.data?.message || "Your leave request has been sent to admin"
      );
      socket.emit("notification", project?.user);
    } else {
      toast.success(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to send leave request!"
      );
    }
  };

  const actions: MenuProps["items"] = [
    {
      key: "1",
      label:
        user?.id === project?.user ? (
          <Button
            type="default"
            className="w-full"
            onClick={() => {
              setIsAddMember(true);
            }}
          >
            Add Member
          </Button>
        ) : null,
    },
    {
      key: "2",
      label:
        user?.id === project?.user ? (
          <Button
            className="w-full"
            type="default"
            onClick={() => {
              setIsRemoveMember(true);
            }}
          >
            Remove Member
          </Button>
        ) : null,
    },
    {
      key: "3",
      label:
        user?.id === project?.user ? (
          <Button
            onClick={() => {
              setIsEditProject(true);
            }}
            className="w-full"
            type="default"
          >
            Edit Project
          </Button>
        ) : null,
    },
    {
      key: "4",
      label:
        user?.id === project?.user ? (
          <Button
            className="w-full"
            type="default"
            onClick={() => {
              setIsDeleteProject(true);
            }}
          >
            Delete
          </Button>
        ) : null,
    },
    {
      key: "5",
      label:
        user?.id !== project?.user && !leaveRequestIds?.includes(user?.id) ? (
          <Button
            className="w-full"
            type="default"
            onClick={handleLeaveRequest}
          >
            Request to leave
          </Button>
        ) : null,
    },
    {
      key: "6",
      label:
        user?.id !== project?.user && leaveRequestIds?.includes(user?.id) ? (
          <Button className="w-full" type="default">
            Cancel leave request
          </Button>
        ) : null,
    },
  ].filter((action) => action.label !== null);

  return (
    <>
      <div className="border border-gray-500 p-2 lg:p-5 rounded-md flex flex-col justify-between gap-1">
        <div className="flex justify-between items-start relative">
          <span className="font-semibold">{name}</span>
          <Dropdown
            menu={{ items: actions }}
            placement="bottomRight"
            arrow
            className="border border-blue-600 px-1"
          >
            <Button type="text">
              <BsThreeDotsVertical className="text-lg" />
            </Button>
          </Dropdown>
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

      {isDeleteProject && (
        <ProjectDeleteModal
          isOpen={isDeleteProject}
          setIsOpen={setIsDeleteProject}
          projectId={project?.id}
          projectName={project?.name}
        />
      )}
      {isEditProject && (
        <EditProjectModal
          isEdit={isEditProject}
          setIsEdit={setIsEditProject}
          project={project}
        />
      )}
      {isAddMember && (
        <AddMemberToProject
          isOpen={isAddMember}
          setIsOpen={setIsAddMember}
          projectId={project.id}
          teamId={project?.team}
        />
      )}

      {isRemoveMember && (
        <RemoveMemberFromProject
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          projectId={project.id}
          teamId={project?.team}
        />
      )}
    </>
  );
};

export default ProjectCard;
