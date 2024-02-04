import { useGetLeaveProjectRequestsByAdminQuery } from '@/features/project';
import { useLoggedInUserQuery } from '@/features/user';
import { IUser } from '@/interfaces/user.interface';
import React from 'react';
import LeaveRequestCard from './LeaveRequestCard';

const ProjectLeaveRequest = () => {
    const {data: userData} = useLoggedInUserQuery({})
    const user: IUser = userData?.data
    const {data: requestsData} = useGetLeaveProjectRequestsByAdminQuery(user?._id)
    const requests = requestsData?.data

    console.log("project", requests);

    return (
        <div>
           {
                requests?.length > 0 && requests?.map((request: any) => <LeaveRequestCard key={request?._id} data={request} />)
             }
        </div>
    );
};

export default ProjectLeaveRequest;