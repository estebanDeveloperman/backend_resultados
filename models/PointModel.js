import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import Phase from "./PhaseModel.js";

const { DataTypes } = Sequelize;

const Point = db.define(
  "point",
  {
    idpoint: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idmatch: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idsport: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    letterRef: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idgroup1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idgroup2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fechaOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_equipoA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_equipoB: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto1_puntoA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto2_puntoA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto3_puntoA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto4_puntoA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto5_puntoA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto1_puntoB: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto2_puntoB: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto3_puntoB: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto4_puntoB: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuarto5_puntoB: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idphase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    // freezeTableName: true,
  }
);

Phase.hasMany(Point);
Point.belongsTo(Phase, { foreignKey: "idphase" });

export default Point;
