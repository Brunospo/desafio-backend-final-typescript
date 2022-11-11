"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("pedidos", function (table) {
        table.increments("id").primary(),
            table.integer("cliente_id").references("clientes.id").notNullable(),
            table.text("observacao"),
            table.integer("valor_total");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("pedidos");
}
exports.down = down;
