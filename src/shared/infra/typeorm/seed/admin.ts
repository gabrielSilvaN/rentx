import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");
  const id = randomUUID();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [id, "admin", "admin@admin.com", password, true, "now()", "XXXX"]
  );

  await connection.close();
}

create()
  .then(() => console.log("user created "))
  .catch((err) => console.log(err));
