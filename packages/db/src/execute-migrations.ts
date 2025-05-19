import * as path from "path"
import { promises as fs } from "fs"
import { Migrator, FileMigrationProvider, MigrationResult } from "kysely"
import db from "."

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  })

  const args = process.argv.slice(2)

  let error = null
  let results: MigrationResult[] | undefined = []
  if (args.length === 0) {
    ;({ error, results } = await migrator.migrateToLatest())
  } else {
    const migrationCommand = args[0]
    if (migrationCommand === "up") {
      ;({ error, results } = await migrator.migrateUp())
    } else if (migrationCommand === "down") {
      ;({ error, results } = await migrator.migrateDown())
    }
  }

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error("failed to migrate")
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()
