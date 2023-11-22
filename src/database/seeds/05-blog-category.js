/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('blog_category').del()
  await knex('blog_category').insert([
    {id: 1, blog_id: 1, category_id: 1},
    {id: 2, blog_id: 1, category_id: 2},
    {id: 3, blog_id: 1, category_id: 3},
    {id: 4, blog_id: 2, category_id: 1},
    {id: 5, blog_id: 3, category_id: 3},
    {id: 6, blog_id: 4, category_id: 2},
    {id: 7, blog_id: 5, category_id: 1}
  ]);
};
