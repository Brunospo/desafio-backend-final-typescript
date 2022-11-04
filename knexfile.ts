import type { Knex } from "knex";
import "dotenv/config"

const port = process.env.DB_PORT as number | undefined

export const config: { [key: string]: Knex.Config } = {
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
