import { Request, Response } from "express"
import { errorHandler, successHandler } from "@mb/utility/src/handler"
import AuthService from "./auth-service"

const OG_DOMAIN_URL = new URL(process.env.FRONTEND_URL as string)
const OG_DOMAIN = OG_DOMAIN_URL.hostname
const { OG_LOCAL_DOMAIN } = process.env
const OG_LOCAL_DOMAIN_HOST = new URL(OG_LOCAL_DOMAIN as string).hostname

// console.log("OG_DOMAIN  : ", OG_DOMAIN)

interface MyRequest extends Request {
  user?: any
}

class AuthController {
  // local login
  public static async login(req: Request, res: Response) {
    try {
      const payload = req.body
      const reqOrigin = req.headers.origin
      const user = await AuthService.login(payload)
      if (user.success) {
        delete user.success
        delete user.message
        delete user.code
        // console.log("OG_DOMAIN  : ", OG_DOMAIN)

        res.cookie("auth-token", user.authtoken, {
          domain: reqOrigin === OG_LOCAL_DOMAIN ? OG_LOCAL_DOMAIN_HOST : OG_DOMAIN,
          httpOnly: true,
          maxAge: 2 * 24 * 60 * 60 * 1000,
          signed: true,
        })
        successHandler(res, user, "User Loggedin successfully")
      } else {
        errorHandler(res, "Bad Request", user.message, user.code)
      }
    } catch (err) {
      errorHandler(res, err)
    }
  }


}
export default AuthController
