import express from "express";

import UserController from "./app/controllers/UserController";
import TaskCotroller from "./app/controllers/TaskController";
import ProfileController from "./app/controllers/ProfileController";
import SessionController from "./app/controllers/SessionController";
import ForgotPasswordController from "./app/controllers/ForgotPasswordController";

import authMiddlewares from "./app/middlewares/auth";

const routes = express.Router();

routes.post("/session", SessionController.login);
routes.post("/forgetpassword", ForgotPasswordController.forgotPassword);
routes.post("/user", UserController.create);

routes.use(authMiddlewares);

routes.get("/profile", ProfileController.index);

routes.post("/tasks", TaskCotroller.create);
routes.get("/tasks", TaskCotroller.index);
routes.get("/tasks/:id", TaskCotroller.show);
routes.put("/tasks/:id", TaskCotroller.update);
routes.delete("/tasks/:id", TaskCotroller.delete);

module.exports = routes;
