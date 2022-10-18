import { Knex, knex } from "knex";
const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: process.env.DB,
    charset: "utf8",
  },
};

export const knx = knex(config);