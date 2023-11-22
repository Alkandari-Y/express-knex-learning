const bcryptHash = require("../../utils/auth/bcryptHash");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();

  const hashed_password = await bcryptHash("P@ssw0rd");
  const users = Array(10)
    .fill(null)
    .map((_, index) => ({
      email: `testuser${index + 1}@mail.com`,
      username: `testuser${index + 1}`,
    }));

  await knex("user").insert(
    users.map((user) => ({ ...user, password: hashed_password }))
  );
};
