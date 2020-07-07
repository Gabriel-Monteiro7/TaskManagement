exports.up = (knex) =>
  knex.schema.createTable("user", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("email").notNullable().unique("email");
    table.string("hashPassword").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("user");
