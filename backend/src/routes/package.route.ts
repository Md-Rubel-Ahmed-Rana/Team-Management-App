import { PackageController } from "@/controllers/package.controller";
import { Router } from "express";

const router = Router();

router.get("/my-package/:userId", PackageController.getMyPackage);

router.patch(
  "/renew/:userId/:planId/:packageId",
  PackageController.renewPackage
);

export const PackageRoutes = router;
