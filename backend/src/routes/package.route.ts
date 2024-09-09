import { PackageController } from "@/controllers/package.controller";
import { Router } from "express";

const router = Router();

router.get("/my-package:/userId", PackageController.getMyPackage);

export const PackageRoutes = router;
