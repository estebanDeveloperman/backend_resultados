import { Sequelize } from "sequelize";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../config.js";

// db_fedup_prueba_local
// const db = new Sequelize("db_fedup_sistema_resultados", "root", "root123", {

// producción
const db = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "mysql",
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
});

// desarrollo
// const db = new Sequelize("db_fedup_sistema_resultados", "root", "root123", {
//   host: "localhost",
//   dialect: "mysql",
// });

export default db;
