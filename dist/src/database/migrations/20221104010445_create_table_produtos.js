"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("produtos", function (table) {
        table.increments("id").primary(),
            table.text("descricao").notNullable(),
            table.integer("quantidade_estoque").notNullable(),
            table.integer("valor").notNullable(),
            table.integer("categoria_id").references("categorias.id").notNullable().onDelete("CASCADE");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("produtos");
}
exports.down = down;
