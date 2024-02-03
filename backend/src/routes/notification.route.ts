import { RedisCacheService } from "@/middlewares/redisCache";
import { Router } from "express";

const router = Router();

router.get("/single/:userId", RedisCacheService.findNotification());

router.patch("/update/:userId", RedisCacheService.updateNotification());

export const NotificationRoutes = router;
