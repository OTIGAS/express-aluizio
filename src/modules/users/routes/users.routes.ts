import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import multer from "multer";
import uploadConfig from "@config/upload";

import UsersController from "../controllers/UsersController";
import UsersAvatarController from "../controllers/UserAvatarController";

import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import isUploadedFile from "@shared/http/middlewares/isUploadedFile";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRouter.get("/", isAuthenticated, usersController.list);

usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  isUploadedFile,
  usersAvatarController.update
);

export default usersRouter;
