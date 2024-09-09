import { INewPackage } from "@/interfaces/package.interface";
import { model, Schema } from "mongoose";

export const packageSchema = new Schema<INewPackage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    packages: [
      {
        plan: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Plan",
        },
        paymentId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Payment",
        },
        limit: {
          team: {
            teamCount: {
              type: Number,
              required: true,
            },
            memberCount: {
              type: Number,
              required: true,
            },
          },
          projectCount: {
            type: Number,
            required: true,
          },
        },
        isCurrent: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

// Middleware to update `isCurrent` field before saving
packageSchema.pre("save", async function (next) {
  const packageDoc = this as any;
  console.log({ packageDoc });

  // If there is a package marked as current, set isCurrent to false for all previous ones
  if (packageDoc.isModified("packages")) {
    const userId = packageDoc.user;
    console.log({ userId });
    const PackageModel = model("Package");

    // Update all other packages for the user, setting `isCurrent` to false
    const myPackages = await PackageModel.updateMany(
      { user: userId, "packages.isCurrent": true },
      { $set: { "packages.$[].isCurrent": false } }
    );
    console.log({ myPackages });
  }

  next();
});

export const Package = model<INewPackage>("Package", packageSchema);
