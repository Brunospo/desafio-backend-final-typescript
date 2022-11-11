"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("usuarios", function (table) {
        table.increments("id").primary(),
            table.string("nome", 60).notNullable(),
            table.text("email").notNullable().unique(),
            table.text("senha").notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("usuarios");
}
exports.down = down;
