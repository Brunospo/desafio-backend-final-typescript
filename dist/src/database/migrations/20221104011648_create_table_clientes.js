"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("clientes", function (table) {
        table.increments("id").primary(),
            table.string("nome", 50).notNullable(),
            table.text("email").notNullable().unique(),
            table.string("cpf", 11).notNullable().unique(),
            table.string("cep", 8),
            table.text("rua"),
            table.smallint("numero"),
            table.text("bairro"),
            table.text("cidade"),
            table.string("estado", 2);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("clientes");
}
exports.down = down;
