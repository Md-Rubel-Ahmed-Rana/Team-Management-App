import { ProjectLeaveRequest } from "../models/projectLeaveRequest.model";


class Service {
    async requestToLeave (data: {project: string, member: string, admin: string}){
        const result = await ProjectLeaveRequest.create(data)
        return result
    }

    async getLeaveRequestByAdmin (admin: string){
        const result = await ProjectLeaveRequest.find({ admin, status: "pending" })
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

    async ignoreRequest (projectId: string, memberId: string){
        console.log("From project ignore");
        const result = await ProjectLeaveRequest.findOneAndUpdate({_id: projectId ,member: memberId, status: "pending"}, {$set: {status: "ignored"}})
        return result
    }
}

export const ProjectLeaveRequestService = new Service()