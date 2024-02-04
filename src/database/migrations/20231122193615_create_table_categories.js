/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
  });
  await knex.schema.createTable("comment", (table) => {
    table.increments("id").primary();
    table.string("text", 256).notNullable();
    table.integer("user_id").notNullable();
    table.integer("blog_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .foreign("blog_id")
      .references("id")
      .inTable("blog")
      .onDelete("CASCADE");
  });
  await knex.schema.createTable("blog_category", (table) => {
    table.increments("id").primary();
    table.integer("blog_id").notNullable();
    table.integer("category_id").notNullable();
    table
      .foreign("blog_id")
      .references("id")
      .inTable("blog")
      .onDelete("CASCADE");
    table
      .foreign("category_id")
      .references("id")
      .inTable("category")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("category");
  await knex.schema.dropTableIfExists("comment");
  await knex.schema.dropTableIfExists("blog_category");
};
