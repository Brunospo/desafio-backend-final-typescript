import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pedido_produtos", function(table) {
    table.increments("id").primary(),
    table.integer("pedido_id").references("pedidos.id").notNullable(),
    table.integer("produto_id").references("produtos.id").notNullable(),
    table.integer("quantidade_produto").notNullable(),
    table.integer("valor_produto")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pedido_produtos")
}
