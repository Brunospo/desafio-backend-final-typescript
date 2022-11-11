"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("categorias", function (table) {
        table.increments("id").primary(),
            table.text("descricao").notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("categorias");
}
exports.down = down;
