import { Router } from "express";
import { PlanController } from "../controllers/plan.controller";

const router = Router();

router.post("/create", PlanController.createPlan);

router.get("/", PlanController.getPlans);

router.get("/single/:id", PlanController.getSinglePlan);

export const PlanRoutes = router;
