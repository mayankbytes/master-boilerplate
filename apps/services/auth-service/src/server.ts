import path from "path";
import { json, urlencoded } from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import AccessLimit from "@mb/auth-middleware/src/access-limit";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import AuthApi from "./auth/auth-route";

const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(
      cors({
        origin: ["http://localhost:3000", `${process.env.FRONTEND_URL}`],
        optionsSuccessStatus: 200,
        credentials: true,
      })
    )
 
    .use(cookieParser(process.env.COOKIE_SECRET))
    .use(AccessLimit)
    // .get("/health", (req, res) => res.json({ ok: true }));



  // auth routes
  app.use("/api/auth", AuthApi.configureRoutes());

  return app;
};

export default createServer;
