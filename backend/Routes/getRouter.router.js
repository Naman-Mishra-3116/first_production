import { Router } from "express";
import { enusreAuthenticatedMiddleware } from "../Middlewares/ensureAuthenticated.middleware.js";
import { userInformationController } from "../Controllers/userInfo.controller.js";
import { getCurrentDayData } from "../Controllers/CurrentDayUserData.controller.js";
import { resetPasswordControllerFunction } from "../Controllers/resetPasswordController.js";

const router = Router();

router.get("/getTodayStats", enusreAuthenticatedMiddleware, getCurrentDayData);

router.get("/getLoggedUserInfo", userInformationController);

router.get("/resetPassword/:id/:token", resetPasswordControllerFunction);

router.get("/getLeaderBoardData");

export { router as getRouter };
