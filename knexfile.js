// Update with your config settings.
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/users.db3",
    },
    useNullAsDefault: true, // a flat required for SQLITE
    seeds: {
      directory: "./database/seeds",
    },
    migrations: {
      directory: "./database/migrations",
    },
  },
};
