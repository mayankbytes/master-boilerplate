import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface UserSchema {
    id: Generated<number>;
    first_name: string;
    last_name: string | null;
    email: string,
    company_id: number | null;
    role_id: number, 
    password: string,
    status: string,
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
    limit?:number;
    offset?:number;
    phone?:string | null;
}

export type SelectUser = Selectable<UserSchema>;
export type CreateUser = Insertable<UserSchema>;
export type UpdateUser = Updateable<UserSchema>;