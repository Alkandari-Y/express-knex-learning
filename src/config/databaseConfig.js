require("dotenv").config();

const connection = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const migrations = {
  tableName: "knex_migrations",
  directory: "./src/database/migrations/",
};

const seeds = {
  directory: "./src/database/seeds/",
};

module.exports = {
  connection,
  migrations,
  seeds,
};
