"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("pedido_produtos", function (table) {
        table.increments("id").primary(),
            table.integer("pedido_id").references("pedidos.id").notNullable(),
            table.integer("produto_id").references("produtos.id").notNullable(),
            table.integer("quantidade_produto").notNullable(),
            table.integer("valor_produto");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("pedido_produtos");
}
exports.down = down;
