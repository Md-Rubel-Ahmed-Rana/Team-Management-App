import { Request, Response } from "express";
import RootController from "../shared/rootController";
import { ProjectLeaveRequestService } from "../services/projectLeaveRequest.service";
import httpStatus from "http-status";


class Controller extends RootController {
    requestToLeave = this.catchAsync(async (req: Request, res: Response) =>{
        const result = await ProjectLeaveRequestService.requestToLeave(req.body)
        this.apiResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Your leave request has been sent to admin",
            data: result
        })
    })

    getLeaveRequestByAdmin = this.catchAsync(async (req: Request, res: Response) =>{
        const result = await ProjectLeaveRequestService.getLeaveRequestByAdmin(req.params.adminId)
        this.apiResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Leave requests found",
            data: result
        })
    })

    ignoreRequest = this.catchAsync(async (req: Request, res: Response) =>{
        const projectId = req.params.projectId
        const memberId = req.params.memberId
        const result = await ProjectLeaveRequestService.ignoreRequest(projectId, memberId)
        this.apiResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Leave request ignored",
            data: result
        })
    })
}

export const ProjectLeaveRequestController = new Controller()