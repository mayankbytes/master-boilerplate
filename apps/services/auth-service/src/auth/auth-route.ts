import { Router } from "express";
import { Protect } from "@mb/auth-middleware";
import validate from "@mb/utility/src/validator";
import AuthController from "./auth-controller";
import { loginValidation } from "./auth-validation";

class IndustryApi {
  static configureRoutes(): Router {
    const router: Router = Router({ mergeParams: true });

    // local login
    router.post("/login", loginValidation(), validate, AuthController.login);
   
    return router;
  }
}

export default IndustryApi;
