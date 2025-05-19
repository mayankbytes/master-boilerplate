import { ROLES, USER_STATUS } from "@mb/utility/src/constants"
import db from "../.."
import { loginResponseCheck } from "../../helpers/common"
import { SelectUser, CreateUser, UpdateUser } from "../../schema/user/user-schema"

class UserRepository {
  static async login(criteria: Partial<SelectUser>) {
    const data = await loginResponseCheck(criteria)
    return data
  }



  static async getUsers(companyId: number|null,criteria: Partial<SelectUser>, role_id:number) {
    const data = {}
    return {
 
    }
  }

  static async createUser(user: CreateUser) {
    const data = await db.withSchema("users").insertInto("users").values(user).returningAll().executeTakeFirst()
    return data
  }

  static async updateUser(id: number, updateWith: UpdateUser) {
    const data = await db
      .withSchema("users")
      .updateTable("users")
      .set(updateWith)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst()
    return data
  }

  static async updateUserPassword(email: string, updatedPassword: UpdateUser) {
    const data = await db
      .withSchema("users")
      .updateTable("users")
      .set(updatedPassword)
      .where("email", "=", email)
      .returningAll()
      .executeTakeFirst()
    return data
  }

  static async userEmailExists(email: string, id: number) {
    let user
    if (id > 0) {
      user = await db
        .withSchema("users")
        .selectFrom("users")
        .where("email", "=", email)
        .where("id", "!=", id)
        .selectAll()
        .executeTakeFirst()
    } else {
      user = await db.withSchema("users").selectFrom("users").where("email", "=", email).selectAll().executeTakeFirst()
    }
    if (user) {
      return true
    }
    return false
  }
  
  static async getUserCountByCompany(companyId: number) {
    return db
      .withSchema("users")
      .selectFrom("users")
      .where("company_id", "=", companyId)
      .where("status", "=", USER_STATUS.ACTIVE)
      .select(({ fn }) => [fn.count<number>("id").as("user_count")])
      .executeTakeFirst()
  }

}

export default UserRepository
