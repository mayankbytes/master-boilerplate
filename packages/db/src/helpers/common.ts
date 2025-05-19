
import db from "../index"

export const loginResponseCheck = async (criteria: any) => {
    const data: any = {}
    data.success = false
    const user = await db
      .withSchema("users")
      .selectFrom("users")
      .innerJoin("user_roles", "user_roles.id", "users.role_id")
      .where("email", "=", criteria.email)
      .select([
        "users.id",
        "users.first_name",
        "users.last_name",
        "users.email",
        "users.role_id",
        "users.company_id",
        "users.status",
        "users.password",
        "user_roles.name as role_name",
      ])
      .executeTakeFirst()
  
    if (user) {
        console.log(user)
    
    } else {
      data.message = "Email id does not exist"
      data.code = 400
    }
    return data
  }
  