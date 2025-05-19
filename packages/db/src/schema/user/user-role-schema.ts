import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface UserRoleSchema {
    id: Generated<number>;
    name: string;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}

export type SelectUserRole = Selectable<UserRoleSchema>;
export type CreateUserRole = Insertable<UserRoleSchema>;
export type UpdateUserRole = Updateable<UserRoleSchema>;