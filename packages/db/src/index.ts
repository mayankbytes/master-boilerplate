import { Pool, types as pgTypes } from "pg"
import { Kysely, PostgresDialect } from "kysely"
import { Database } from "./schema/user"
import getDbURL from "./helpers"

const DB_URL = getDbURL()

console.log("DB_URL : ", DB_URL)

pgTypes.setTypeParser(pgTypes.builtins.NUMERIC, (value: string) => parseFloat(value))

const dialect = new PostgresDialect({
  pool: async () => new Pool({ connectionString: DB_URL }),
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export default new Kysely<Database>({ dialect })
