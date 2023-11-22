/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTable("blog", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.boolean("published").defaultTo(false);
    table.date("published_at", { useTz: true }).nullable();
    table.integer("author_id").notNullable();
    table
      .foreign("author_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("blog");
  await knex.schema.dropTableIfExists("user");
};
