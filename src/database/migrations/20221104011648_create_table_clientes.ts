import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("clientes", function(table) {
    table.increments("id").primary(),
    table.string("nome", 50).notNullable(),
    table.text("email").notNullable().unique(),
    table.string("cpf", 11).notNullable().unique(),
    table.string("cep", 8),
    table.text("rua"),
    table.smallint("numero"),
    table.text("bairro"),
    table.text("cidade"),
    table.string("estado", 2)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("clientes")
}
