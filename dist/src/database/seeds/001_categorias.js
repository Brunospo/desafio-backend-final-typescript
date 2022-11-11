"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("categorias").del();
    // Inserts seed entries
    await knex("categorias").insert([
        { id: 1, descricao: "Informática" },
        { id: 2, descricao: "Celulares" },
        { id: 3, descricao: "Beleza e Perfumaria" },
        { id: 4, descricao: "Mercado" },
        { id: 5, descricao: "Livros e Papelaria" },
        { id: 6, descricao: "Brinquedos" },
        { id: 7, descricao: "Moda" },
        { id: 8, descricao: "Bebê" },
        { id: 9, descricao: "Games" }
    ]);
}
exports.seed = seed;
;
