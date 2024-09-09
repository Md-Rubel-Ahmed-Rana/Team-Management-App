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
<<<<<<< HEAD
      if (!myTeams || myTeams.length < teamCount) {
=======
      if (!myTeams || myTeams?.length < teamCount) {
>>>>>>> 1c53476927925accfedd745a99cc27fa87b81c2d
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
<<<<<<< HEAD
      const teamCount = currentPackage?.limit?.team?.teamCount || 0;

      if (!myTeams || myTeams.length < teamCount) {
        return next();
      }

      const team = myTeams.find((team) => team.id === teamId);
      const teamMemberCount = currentPackage?.limit?.team?.memberCount || 0;

      if (team && team?.activeMembers?.length >= teamMemberCount) {
=======
      const team = myTeams.find((team) => team?.id === teamId);
      const teamMemberCount = currentPackage?.limit?.team?.memberCount || 0;
      console.log({
        teamMemberCount,
        activeMembers: team?.activeMembers?.length,
      });

      if (team && team?.activeMembers?.length >= teamMemberCount) {
        console.log("// prevent to add new member");
>>>>>>> 1c53476927925accfedd745a99cc27fa87b81c2d
        return res.status(httpStatus.UNAUTHORIZED).json({
          statusCode: httpStatus.UNAUTHORIZED,
          success: false,
          message:
            "You have exceeded the maximum team member limit. Please upgrade your plan.",
        });
      }
<<<<<<< HEAD

=======
      console.log("// Allow to add new member");
>>>>>>> 1c53476927925accfedd745a99cc27fa87b81c2d
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

<<<<<<< HEAD
      if (!myProjects || myProjects.length < projectCount) {
        return next();
      }

=======
      console.log({ projectCount, myProjects: myProjects.length });

      if (!myProjects || myProjects.length < projectCount) {
        console.log("Allow user to create project");
        return next();
      }
      console.log("Prevent user to create project");
>>>>>>> 1c53476927925accfedd745a99cc27fa87b81c2d
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
