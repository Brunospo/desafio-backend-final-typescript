import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('produtos', function (table) {
    table.text('produto_imagem');
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('produtos', function (table) {
    table.dropColumn('produto_imagem');
  })
}
