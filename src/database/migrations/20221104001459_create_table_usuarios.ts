import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("usuarios", function (table) {
    table.increments("id").primary(),
    table.string("nome", 60).notNullable(),
    table.text("email").notNullable().unique(),
    table.text("senha").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("usuarios")
}
