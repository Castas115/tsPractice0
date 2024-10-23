import * as express from "express";
import { authentification, authorization } from "../middleware/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
const Router = express.Router();

Router.get(
  "/users",
  authentification,
  authorization(["admin"]),
  UserController.getUsers as any
);
Router.get(
  "/profile",
  authentification,
  authorization(["user", "admin"]),
  AuthController.getProfile as any
);
Router.post("/signup", UserController.signup as any);
Router.post("/login", AuthController.login as any);
// Router.put(
//   "/update/:id",
//   authentification,
//   authorization(["user", "admin"]),
//   UserController.updateUser
// );

Router.delete(
  "/delete/:id",
  authentification,
  authorization(["admin"]),
  UserController.deleteUser as any
);
export { Router as userRouter };