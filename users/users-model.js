const db = require("../database/dbConfig");

//Get users
function find() {
  return db("users").select("id", "username", "role").orderBy("id");
}

// function findRoles() {
//   ///or join the roles as
//   return db("users")
//     .join("roles", "roles.id", "=", "users.id")
//     .select("user.id", "user.name", "role.name")
//     .orderBy("id");
// }

//POST USER
function add(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => {
      return db("users").where({ id: ids }).first();
    });
}

//FIND BY USERNAME AND PASSWORD
function findBy(filter) {
  return db("users").where(filter).orderBy("id").first();
}

//function findBYId
function findById(id) {
  return db("users").where({ id: id }).first();
}

module.exports = {
  find,
  add,
  findBy,
  findById,
};
