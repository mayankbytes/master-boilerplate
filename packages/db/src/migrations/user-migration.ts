import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    // user schema
    await db.schema
        .createSchema('users')
        .execute();

    // user roles table
    await db.schema
        .withSchema('users')
        .createTable('user_roles')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'varchar', (col) => col.notNull())
        .addColumn('created_at', 'timestamptz', (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .addColumn('updated_at', 'timestamptz', (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .execute();

    // user status enum
    await db.schema
        .withSchema('users')
        .createType('user_status')
        .asEnum(['Active', 'Inactive'])
        .execute();

    // users table
    await db.schema
        .withSchema('users')
        .createTable('users')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('first_name', 'varchar', (col) => col.notNull())
        .addColumn('last_name', 'varchar')
        .addColumn('email', 'varchar', (col) => col.notNull())
        .addColumn('company_id', 'integer', (col) =>
            col.defaultTo(null)
        )
        .addColumn('role_id', 'integer', (col) =>
            col.notNull()
        )
        .addColumn('password', 'varchar', (col) => col.notNull())
        .addColumn('status', sql`users.user_status`, (col) => col.notNull().defaultTo('Active'))
        .addColumn('created_at', 'timestamptz', (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .addColumn('updated_at', 'timestamptz', (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.withSchema('users').dropTable('users').execute();
    await db.schema.withSchema('users').dropTable('user_roles').execute();   
    await db.schema.withSchema('users').dropType('user_status').execute();
}
