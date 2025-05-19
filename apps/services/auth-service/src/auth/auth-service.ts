import UserRepository from "@mb/db/src/repository/user/user-repository"
import { OAuth2Client } from "google-auth-library"
import { AuthPayload } from "./auth-types"

const client = new OAuth2Client()

class AuthService {
  static async login(user: AuthPayload) {
    const payload: AuthPayload = {
      email: user.email,
      password: user.password,
    }
    return UserRepository.login(payload)
  }

  // static async googleLogin(input: GoogleLoginResponse) {
  //   let data: any = {}
  //   data.success = false
  //   // token exits checks
  //   const token = input.credential
  //   if (!token || token === "") {
  //     data.message = "cant get google auth token"
  //     data.code = 500
  //   } else {
  //     // verify google auth token
  //     const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience: process.env.GOGGLE_CLIENT_ID,
  //     })
  //     // google auth payload
  //     const payload = ticket.getPayload()

  //     if (payload && payload.email) {
  //       // check if user exits in local db
  //       const criteria: AuthPayload = {
  //         email: payload.email,
  //         password: "",
  //       }
  //       data = await UserRepository.googleLogin(criteria)
  //     } else {
  //       data.message = "cant get google auth email"
  //       data.code = 500
  //     }
  //   }
  //   return data
  // }

  // static async microsoftLogin(user: AuthPayload) {
  //   const payload: AuthPayload = {
  //     email: user.email,
  //     password: user.password,
  //   }
  //   return UserRepository.microsoftLogin(payload)
  // }
}

export default AuthService
