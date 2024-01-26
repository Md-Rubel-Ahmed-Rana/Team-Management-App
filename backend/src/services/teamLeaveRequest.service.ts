import { TeamLeaveRequest } from "../models/teamLeaveRequest.model";


class Service {
    async requestToLeave (data: {team: string, member: string, admin: string}){
        const result = await TeamLeaveRequest.create(data)
        return result
    }
    
    async getLeaveRequestByAdmin (admin: string){
        const result = await TeamLeaveRequest.find({admin, status: "pending"})
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

    async ignoreRequest (teamId: string, memberId: string){
        console.log("From team ignore", teamId, memberId);
        const result = await TeamLeaveRequest.updateOne({_id: teamId,member: memberId, status: "pending"}, {$set: {status: "ignored"}})
        return result
    }
}

export const TeamLeaveRequestService = new Service()