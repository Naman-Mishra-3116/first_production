import { Router } from "express";
import { loginControllerFunction } from "../Controllers/login.controller.js";
import { signupControllerFunction } from "../Controllers/signup.controller.js";
import { signupValidationMiddleware } from "./../Middlewares/signupValidation.middleware.js";
import { loginValidationMiddleware } from "./../Middlewares/loginValidation.middleware.js";
import { enusreAuthenticatedMiddleware } from "./../Middlewares/ensureAuthenticated.middleware.js";
import { passWordValidationMiddeWare } from "../Middlewares/passwordValidation.middleware.js";
import { changePasswordControllerFunction } from "../Controllers/changePassword.controller.js";
import { submitIndiviudalTestController } from "../Controllers/submitIndividualTest.controller.js";
import { forgetPasswordControllerFunction } from "../Controllers/forgetPassword.controller.js";
import { forgetPasswordPostRouter } from "../Controllers/forgetPasswordPostRouter.js";
const router = Router();

/**
 * @login Post router for handling login requests with validation middleware.
 */

router.post("/auth/login", loginValidationMiddleware, loginControllerFunction);

/**
 * @singup Post router for handling signup request with validation middleware
 */

router.post(
  "/auth/signup",
  signupValidationMiddleware,
  signupControllerFunction
);

/**
 * @passwordChanging Post router for changing the password of the user when the user loged in.
 */
router.post(
  "/auth/changePassword",
  enusreAuthenticatedMiddleware,
  passWordValidationMiddeWare,
  changePasswordControllerFunction
);

/**
 * @submitTest Post router for submitting individual test taken by the user when the user is logged in.
 */

router.post(
  "/test/submitTest",
  enusreAuthenticatedMiddleware,
  submitIndiviudalTestController
);

/**
 * @forgetPassword Post router that will be hit when the user wants to reset his or her password.
 * @unauth Router hsa no authentication because user will be definately logged out while resetting the password.
 *
 */
router.post("/forgetPassword", forgetPasswordControllerFunction);

router.post("/resetPassword/:id/:token", forgetPasswordPostRouter);

export { router as postRouter };
