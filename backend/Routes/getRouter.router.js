import { Router } from "express";
import { enusreAuthenticatedMiddleware } from "../Middlewares/ensureAuthenticated.middleware.js";
import { userInformationController } from "../Controllers/userInfo.controller.js";
import { getCurrentDayData } from "../Controllers/CurrentDayUserData.controller.js";
import { getDailyLeaderBoardData } from "../Controllers/getDailyLeaderBoardData.js";

const router = Router();

router.get("/getTodayStats", enusreAuthenticatedMiddleware, getCurrentDayData);

router.get("/getLoggedUserInfo", userInformationController);

router.get("/getLeaderBoardData", getDailyLeaderBoardData);

export { router as getRouter };
