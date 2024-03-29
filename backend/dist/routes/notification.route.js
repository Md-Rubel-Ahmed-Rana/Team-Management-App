"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const redisCache_1 = require("@/middlewares/redisCache");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/single/:userId", redisCache_1.RedisCacheService.findNotification());
router.patch("/update/:userId", redisCache_1.RedisCacheService.updateNotification());
exports.NotificationRoutes = router;
