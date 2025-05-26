import { faker } from "@faker-js/faker";
import { sql } from "kysely";
// import { uploadDetailsFile } from "@mb/utility"
// import fs from "fs";
// import axios from "axios";
import db from "..";

// user role seeder
async function userRoleSeeder() {
  const roles: any[] = [
    {
      name: "super_admin",
    },
    {
      name: "admin",
    },
    {
      name: "user",
    },
  ];

  await db.withSchema("users").insertInto("user_roles").values(roles).execute();
}

// user seeder
async function userSeeder() {
  const users: any[] = [];
  [...Array(100)].forEach((_, i) => {
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    let randomEmail = null;
    let role;
    if (i === 0) {
      role = 1;
      randomEmail = "superadmin@tothenew.com";
    } else if (i === 1) {
      role = 2;
      randomEmail = "admin@tothenew.com";
    } else {
      role = 3;
      randomEmail = i === 2 ? "user@tothenew.com" : faker.internet.email();
    }
    users.push({
      first_name: randomFirstName,
      last_name: randomLastName,
      email: randomEmail,
      // company_id: Math.floor(Math.random() * 10 + 1),
      // role_id: i > 1 ? 3 : 2,
      company_id: i <= 2 ? 1 : Math.floor(Math.random() * 10 + 1),
      role_id: role,
      password: "$2a$10$0nPO01JjIwwvUofzjqBnYOSfAwakRi.2npvVRsuxvwVDSFcC9.Lxm", // password 12345678
      status: "Active",
    });
  });

  await db.withSchema("users").insertInto("users").values(users).execute();
}

function seedData() {
  userRoleSeeder();
  userSeeder();
}

const args = process.argv.slice(2);
if (args.length === 0) {
  seedData();
} else {
  const seederCommand = args[0];
  if (seederCommand === "up") {
    seedData();
  }
}
