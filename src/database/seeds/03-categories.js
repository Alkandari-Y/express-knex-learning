/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {id: 1, name: 'sports'},
    {id: 2, name: 'coding'},
    {id: 3, name: 'food'}
  ]);
};
