"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
const port = process.env.DB_PORT;
//Usar isso quendo for gerar ou executar alguma migration, pois com o código de baixo dá erro por conta de um BUG do Knex com o TypeScript
/* module.exports = {
  development: {

    client: "pg",
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: port
    },

    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
    directory: `${__dirname}/src/database/seeds`
  }
},

production: {

  client: "pg",
  connection: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: port
  },

  migrations: {
    tableName: "knex_migrations",
    directory: `${__dirname}/src/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`
  }
}
} */
exports.config = {
    development: {
        client: "pg",
        connection: {
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: port
        },
        migrations: {
            tableName: "knex_migrations",
            directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`
        }
    },
    production: {
        client: "pg",
        connection: {
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: port
        },
        migrations: {
            tableName: "knex_migrations",
            directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`
        }
    }
};
