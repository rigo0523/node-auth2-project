const db = require("../database/dbConfig");

//Get users
function find() {
  return db("users").select("id", "username", "role").orderBy("id");
}

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
