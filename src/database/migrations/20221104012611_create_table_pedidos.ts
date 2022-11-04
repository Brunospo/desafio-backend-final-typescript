import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pedidos", function(table) {
    table.increments("id").primary(),
    table.integer("cliente_id").references("clientes.id").notNullable(),
    table.text("observacao"),
    table.integer("valor_total")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pedidos")
}
