import { Router } from "express";
import { enusreAuthenticatedMiddleware } from "./../Middlewares/ensureAuthenticated.middleware.js";
import { deleteUserController } from "../Controllers/deleteUser.controller.js";

const router = Router();

router.delete(
  "/auth/deleteUser",
  enusreAuthenticatedMiddleware,
  deleteUserController
);

export { router as deleteRouter };
