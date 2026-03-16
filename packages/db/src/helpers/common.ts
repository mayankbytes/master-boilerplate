import db from "../index";
import { generateAuthToken, comparePassword } from "@mb/utility/src/helper"

export const loginResponseCheck = async (criteria: any) => {
  const data: any = {};
  data.success = false;
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
    .executeTakeFirst();

  if (user) {
    console.log(user);

    if (
      criteria.password !== "" &&
      !(await comparePassword(criteria.password, user.password))
    ) {
      data.message = "Password does not match";
      data.code = 401;
    } else if (!user.role_id || user.role_id <= 0) {
      data.message = "You do not have permission to login";
      data.code = 401;
    } else if (user.status !== "Active") {
      data.message = "Your account is not activated";
      data.code = 403;
    } else {
      data.code = 200;
      data.success = true;
      data.message = "";
      data.id = user.id;
      data.first_name = user.first_name;
      data.last_name = user.last_name;
      data.email = user.email;
      data.company_id = user.company_id;
      data.role_id = user.role_id;
      data.status = user.status;
      data.authtoken = generateAuthToken(
        user.id,
        user.company_id,
        user.role_id
      );
    }
  } else {
    data.message = "Email id does not exist";
    data.code = 400;
  }
  return data;
};
