import { Request, Response } from "express";
import RootController from "../shared/rootController";
import httpStatus from "http-status";
import { TeamLeaveRequestService } from "../services/teamLeaveRequest.service";


class Controller extends RootController {
    requestToLeave = this.catchAsync(async (req: Request, res: Response) => {
        const result = await TeamLeaveRequestService.requestToLeave(req.body)
        this.apiResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Your leave request has been sent to admin",
            data: result
        })
    })

    getLeaveRequestByAdmin = this.catchAsync(async (req: Request, res: Response) =>{
        const result = await TeamLeaveRequestService.getLeaveRequestByAdmin(req.params.adminId)
        this.apiResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Leave requests found",
            data: result
        })
    })
}

export const TeamLeaveRequestController = new Controller()