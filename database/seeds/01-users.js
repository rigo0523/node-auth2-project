exports.seed = function (knex) {
  // Deletes ALL existing entries
  // Inserts seed entries
  return knex("users").insert([
    { username: "Rigo1", password: "test1", role: "student" },
  ]);
};
