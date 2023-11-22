/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comment").del();
  await knex("comment").insert([
    { id: 1, blog_id: 1, text: "comment 1", user_id: 1 },
    { id: 2, blog_id: 2, text: "comment 2", user_id: 1 },
    { id: 3, blog_id: 3, text: "comment 3", user_id: 1 },
  ]);
};
