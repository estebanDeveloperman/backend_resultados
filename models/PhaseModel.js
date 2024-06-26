import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Category from "./CategoryModel.js";
import TypeCompetition from "./TypeCompetitionModel.js";

const { DataTypes } = Sequelize;

const Phase = db.define(
  "phase",
  {
    idphase: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idtypeCompetition: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    ismerito: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    numberOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idchampionship: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idcategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    // freezeTableName: true
  }
);

Category.hasMany(Phase);
Phase.belongsTo(Category, { foreignKey: "idcategory" });

// TypeCompetition.hasOne(Phase);
// Phase.belongsTo(TypeCompetition, { foreignKey: "idtypeCompetition" });

export default Phase;
