import { Router } from "express";
import { RedisCacheService } from "../middlewares/redisCache";

const router = Router();

router.get("/single/:userId", RedisCacheService.findNotification());

router.patch("/update/:userId", RedisCacheService.updateNotification());

export const NotificationRoutes = router;
