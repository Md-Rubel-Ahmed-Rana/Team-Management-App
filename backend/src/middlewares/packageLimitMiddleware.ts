import { ProjectService } from "@/services/project.service";
import { TeamService } from "@/services/team.service";
import checkPackageAndGetCurrent from "@/utils/checkPackageAndGetCurrent";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const packageLimitMiddleware = {
  teamCreate: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.id;
    console.log({ userId });
    const currentPackage = await checkPackageAndGetCurrent(userId);
    if (currentPackage) {
      const myTeams = await TeamService.getMyTeams(userId);
      const teamCount = currentPackage?.limit?.team?.teamCount || 0;
      // Early return to avoid nesting
      if (!myTeams || myTeams.length < teamCount) {
        return next();
      }
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message:
          "You have exceeded the maximum team creation limit. Please upgrade your plan.",
      });
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message:
          "You did not purchase any plan yet. Please purchase a plan to create and manage teams, projects and tasks.",
      });
    }
  },

  teamMemberAdd: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.id;
    const teamId = req.params.teamId;
    const currentPackage = await checkPackageAndGetCurrent(userId);

    if (currentPackage) {
      const myTeams = await TeamService.getMyTeams(userId);
      const teamCount = currentPackage?.limit?.team?.teamCount || 0;

      if (!myTeams || myTeams.length < teamCount) {
        return next();
      }

      const team = myTeams.find((team) => team.id === teamId);
      const teamMemberCount = currentPackage?.limit?.team?.memberCount || 0;

      if (team && team?.activeMembers?.length >= teamMemberCount) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          statusCode: httpStatus.UNAUTHORIZED,
          success: false,
          message:
            "You have exceeded the maximum team member limit. Please upgrade your plan.",
        });
      }

      return next();
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message:
          "You did not purchase any plan yet. Please purchase a plan to create and manage teams, projects and tasks.",
      });
    }
  },

  projectCreate: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.id;
    const currentPackage = await checkPackageAndGetCurrent(userId);

    if (currentPackage) {
      const myProjects = await ProjectService.myProjects(userId);
      const projectCount = currentPackage?.limit?.projectCount || 0;

      if (!myProjects || myProjects.length < projectCount) {
        return next();
      }

      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message:
          "You have exceeded the maximum project creation limit. Please upgrade your plan.",
      });
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message:
          "You did not purchase any plan yet. Please purchase a plan to create and manage teams, projects and tasks.",
      });
    }
  },
};

export default packageLimitMiddleware;
