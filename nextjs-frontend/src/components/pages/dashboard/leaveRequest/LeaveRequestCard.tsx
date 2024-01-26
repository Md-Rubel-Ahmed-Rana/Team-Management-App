import { useIgnoreProjectLeaveRequestMutation, useRemoveMemberMutation } from '@/features/project';
import { useIgnoreTeamLeaveRequestMutation, useRemoveTeamMemberMutation } from '@/features/team';
import React from 'react';
import Swal from 'sweetalert2';

const LeaveRequestCard = ({ data }: any) => {
    const { member, project, team } = data;
    const [removeProjectMember] = useRemoveMemberMutation();
    const [removeTeamMember] = useRemoveTeamMemberMutation();
    const [ ignoreProjectLeaveRequest] = useIgnoreProjectLeaveRequestMutation();
    const [ignoreTeamLeaveRequest] = useIgnoreTeamLeaveRequestMutation();

    const handleAcceptRequest = async() => {
        if(project){
            const memberData = {
                projectId: project?._id,
                memberId: member?._id,
            };
            const result: any = await removeProjectMember(memberData);
            if (result?.data?.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: result?.data?.message,
                showConfirmButton: false,
                timer: 1500,
            });
            } 
            if(result?.error) {
            Swal.fire({
                position: "center",
                icon: "error",
                text: result?.error?.data?.message,
                showConfirmButton: true,
            });
            }
        }else{
            const memberData = {
                teamId: team?._id,
                memberId: member?._id,
            };
            const result: any = await removeTeamMember(memberData);
             console.log("Team", memberData);
            if (result?.data?.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: result?.data?.message,
                showConfirmButton: false,
                timer: 1500,
            });
            } 
            if(result?.error) {
            Swal.fire({
                position: "center",
                icon: "error",
                text: result?.error?.data?.message,
                showConfirmButton: true,
            });
            }
           
        }
    }

    const handleIgnoreRequest = async() => {
        if(project){
            console.log("Project");
            const result: any = await ignoreProjectLeaveRequest(data?._id);
            if (result?.data?.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: result?.data?.message,
                showConfirmButton: false,
                timer: 1500,
            });
            } 
            if(result?.error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    text: result?.error?.data?.message,
                   showConfirmButton: true,
               });
            }
        }else{
            console.log("Team");
            const result: any = await ignoreTeamLeaveRequest(data?._id);
            if (result?.data?.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: result?.data?.message,
                showConfirmButton: false,
                timer: 1500,
            });
            } 
            if(result?.error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    text: result?.error?.data?.message,
                   showConfirmButton: true,
               });
            }
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h4 className="text-xl font-bold mb-2">Name: {project?.name || team?.name}</h4>
            <h5 className="text-lg font-semibold mb-2">Member: {member.name}</h5>
            <div className="flex space-x-4">
                <button onClick={handleIgnoreRequest} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none">
                    Ignore
                </button>
                <button onClick={handleAcceptRequest} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none">
                    Accept
                </button>
            </div>
        </div>
    );
};

export default LeaveRequestCard;
