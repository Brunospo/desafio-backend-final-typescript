import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("produtos", function(table) {
    table.increments("id").primary(),
    table.text("descricao").notNullable(),
    table.integer("quantidade_estoque").notNullable(),
    table.integer("valor").notNullable(),
    table.integer("categoria_id").references("categorias.id").notNullable().onDelete("CASCADE")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("produtos")
}
