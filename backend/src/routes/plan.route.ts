import { Router } from "express";
import { PlanController } from "../controllers/plan.controller";
import verifyJwt from "../middlewares/auth";

const router = Router();

router.post("/create", verifyJwt, PlanController.createPlan);

router.get("/", PlanController.getPlans);

router.get("/single/:id", verifyJwt, PlanController.getSinglePlan);

export const PlanRoutes = router;
