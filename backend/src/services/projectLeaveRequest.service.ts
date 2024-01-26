import { ProjectLeaveRequest } from "../models/projectLeaveRequest.model";


class Service {
    async requestToLeave (data: {project: string, member: string, admin: string}){
        const result = await ProjectLeaveRequest.create(data)
        return result
    }

    async getLeaveRequestByAdmin (admin: string){
        const result = await ProjectLeaveRequest.find({ admin })
            .populate({
                path: 'project',
                model: 'Project',
                select: 'name', 
            })
            .populate({
                path: 'member',
                model: 'User',
                select: 'name',
            })
        return result
    }
}

export const ProjectLeaveRequestService = new Service()