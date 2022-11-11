"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('produtos', function (table) {
        table.text('produto_imagem');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable('produtos', function (table) {
        table.dropColumn('produto_imagem');
    });
}
exports.down = down;
