import { TeamLeaveRequest } from "../models/teamLeaveRequest.model";


class Service {
    async requestToLeave (data: {team: string, member: string, admin: string}){
        const result = await TeamLeaveRequest.create(data)
        return result
    }
    
    async getLeaveRequestByAdmin (admin: string){
        const result = await TeamLeaveRequest.find({admin})
        .populate({
                path: 'team',
                model: 'Team',
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

export const TeamLeaveRequestService = new Service()