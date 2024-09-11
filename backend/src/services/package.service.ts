import { Types } from "mongoose";
import { PlanService } from "./plan.service";
import ApiError from "@/shared/apiError";
import { packagesData } from "@/constants/packages";
import httpStatus from "http-status";
import { Package } from "@/models/package.model";
import {
  INewPackage,
  IPackageData,
  IPayment,
  IPlan,
  PackageDetail,
} from "@/interfaces/package.interface";

class Service {
  public planSanitizer(plan: any): IPlan {
    return {
      id: String(plan?.id || plan?._id),
      name: plan?.plan,
      price: plan?.price,
      features: plan?.features,
    };
  }

  public paymentSanitizer(payment: any): IPayment {
    return {
      id: String(payment?.id || payment?._id),
      user: payment?.user,
      plan: payment?.plan,
      paymentAmount: payment?.paymentAmount,
      sessionId: payment?.sessionId,
      sessionUrl: payment?.sessionUrl,
      status: payment?.status,
      createdAt: payment?.createdAt,
      updatedAt: payment?.updatedAt,
    };
  }

  public packageDetailSanitizer(pkgs: any): PackageDetail[] {
    return pkgs?.map((pkg: any) => ({
      id: String(pkg?.id || pkg?._id),
      plan: this.planSanitizer(pkg?.plan),
      limit: pkg?.limit,
      payment: this.paymentSanitizer(pkg?.payment),
      isCurrent: pkg?.isCurrent,
      start: pkg?.start,
      end: pkg?.end,
    }));
  }

  public packageSanitizer(pkg: any): IPackageData {
    return {
      id: String(pkg?.id || pkg?._id),
      user: pkg?.user,
      packages: this.packageDetailSanitizer(pkg?.packages),
      createdAt: pkg?.createdAt,
      updatedAt: pkg?.updatedAt,
    };
  }

  async addNewPackage(
    userId: Types.ObjectId | string,
    planId: Types.ObjectId | string,
    paymentId: Types.ObjectId | string
  ) {
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
                payment: paymentId as Types.ObjectId,
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
              payment: paymentId as Types.ObjectId,
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

  async isPackageExist(userId: string) {
    return await Package.findOne({ user: userId });
  }
  async getMyPackage(userId: string): Promise<IPackageData> {
    const myPackage = await Package.findOne({ user: userId })
      .populate("packages.plan")
      .populate("packages.payment");
    return this.packageSanitizer(myPackage);
  }
}

export const PackageService = new Service();
