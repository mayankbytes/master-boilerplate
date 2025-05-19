import { Request, Response, NextFunction } from "express"

// const userAccessCount:any = {};
interface MyRequest extends Request {
  user?: any
  stpuser?: any
  subscription_usage?: any
}

function Protect(feature: string, scope: string, stp_auth = false) {
  return async (req: MyRequest, res: Response, next: NextFunction) => { }
  
}
export default Protect
