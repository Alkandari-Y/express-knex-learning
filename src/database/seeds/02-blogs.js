/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("blog").del();
  await knex("blog").insert([
    {
      id: 1,
      title: "Chapter 1",
      content: "Some content",
      published: false,
      author_id: 1,
    },
    {
      id: 2,
      title: "Chapter 2",
      content: "Some content",
      published: false,
      author_id: 1,
    },
    {
      id: 3,
      title: "Chapter 3",
      content: "Some content",
      published: false,
      author_id: 1,
    },
    {
      id: 4,
      title: "Section 1",
      content: "Some content",
      published: false,
      author_id: 2,
    },
    {
      id: 5,
      title: "Section 2",
      content: "Some content",
      published: false,
      author_id: 2,
    },
    {
      id: 6,
      title: "Section 3",
      content: "Some content",
      published: false,
      author_id: 2,
    },
    {
      id: 7,
      title: "Section 4",
      content: "Some content",
      published: false,
      author_id: 2,
    },
    {
      id: 8,
      title: "Draft 1",
      content: "Some content",
      published: false,
      author_id: 3,
    },
    {
      id: 9,
      title: "Draft 42",
      content: "Some content",
      published: false,
      author_id: 3,
    },
  ]);
};
