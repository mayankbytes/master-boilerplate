import { Request,Response,NextFunction } from "express";

interface MyRequest extends Request {
    user?: any,
    stpuser?:any
    subscription_usage?:any
}

const AccessLimit = async(req:MyRequest, res:Response, next:NextFunction)  => {
    console.log("before finish")
    res.on("finish", async () => {
        try {
            console.log("res finished subsription usaage", req.subscription_usage)
          
        } catch(error) {
            console.log('error in access middleware',error)
        }   
    })
    console.log("after finish")
    next()
 
};
export default AccessLimit