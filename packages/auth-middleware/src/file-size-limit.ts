import { Request, Response, NextFunction } from "express";
// import { PLAN_LIMIT_TYPE } from "@mb/utility/src/constants";
// import { errorHandler } from "./helpers/handlers";

interface MyRequest extends Request {
  user?: any;
  stpuser?: any;
  subscription_usage?: any;
}

const FileSizeLimit = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  

  next();
};
export default FileSizeLimit;
