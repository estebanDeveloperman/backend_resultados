import { Sequelize } from "sequelize";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../config.js";

// db_fedup_prueba_local
// const db = new Sequelize("db_fedup_sistema_resultados", "root", "root123", {
const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

export default db;
