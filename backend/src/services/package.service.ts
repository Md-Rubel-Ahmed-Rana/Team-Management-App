import { Types } from "mongoose";
import { PlanService } from "./plan.service";
import ApiError from "@/shared/apiError";
import { packagesData } from "@/constants/packages";
import httpStatus from "http-status";
import { Package } from "@/models/package.model";
import { INewPackage } from "@/interfaces/package.interface";

class Service {
  async addNewPackage(
    userId: Types.ObjectId | string,
    planId: Types.ObjectId | string,
    paymentId: Types.ObjectId | string
  ) {
    console.log({ userId, planId, paymentId });
    // Fetch the plan first and handle not found
    const plan = await PlanService.getSinglePlan(planId);
    if (!plan) {
      throw new ApiError(httpStatus.NOT_FOUND, "Plan not found");
    }

    const planName = plan.plan?.toLowerCase() as keyof typeof packagesData;
    const packageData = packagesData[planName];

    const session = await Package.startSession();
    session.startTransaction();
    try {
      // Fetch existing user package
      const isExist = await Package.findOne({ user: userId }).session(session);

      if (isExist) {
        // Check if the user already has the selected plan
        const isPlanExist = isExist.packages?.some(
          (pkg) => String(pkg.plan) === String(planId)
        );
        if (isPlanExist) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "You have already used this plan"
          );
        }

        // Unset 'isCurrent' for other packages
        await Package.updateMany(
          { user: userId, "packages.isCurrent": true },
          { $set: { "packages.$[].isCurrent": false } },
          { session }
        );

        // Push the new plan
        await Package.findByIdAndUpdate(
          isExist?._id,
          {
            $push: {
              packages: {
                plan: planId as Types.ObjectId,
                isCurrent: true,
                limit: packageData,
                paymentId: paymentId as Types.ObjectId,
              },
            },
          },
          { session }
        );
      } else {
        // Create a new package if none exist
        const newPackageData: INewPackage = {
          user: userId as Types.ObjectId,
          packages: [
            {
              plan: planId as Types.ObjectId,
              isCurrent: true,
              limit: packageData,
              paymentId: paymentId as Types.ObjectId,
            },
          ],
        };
        await Package.create([newPackageData], { session });
      }

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

export const PackageService = new Service();
