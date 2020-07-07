exports.up = (knex) =>
  knex.schema.createTable("tasks", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("deadline").notNullable();
    table.string("priority").notNullable();
    table.string("description").notNullable();
    table.boolean("completed").notNullable().defaultTo(false);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.integer("user_id").notNullable();

    table.foreign("user_id").references("id").inTable("user");
  });

exports.down = (knex) => knex.schema.dropTable("tasks");
