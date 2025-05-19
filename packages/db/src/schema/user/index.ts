import { UserRoleSchema } from "./user-role-schema";
import { UserSchema } from "./user-schema";

export interface Database {
  users: UserSchema;
  user_roles: UserRoleSchema;
}
