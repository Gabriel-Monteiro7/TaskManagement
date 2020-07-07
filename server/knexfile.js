// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "management",
      user: "management",
      password: "root",
      port: "8080",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },
};
