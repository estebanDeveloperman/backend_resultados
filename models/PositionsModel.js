import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import Phase from "./PhaseModel.js";

const { DataTypes } = Sequelize;

const Position = db.define("position", {
  idposition: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  groupAsciiLetter: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idsport: { type: DataTypes.INTEGER, allowNull: true },
  idgroup: { type: DataTypes.INTEGER, allowNull: true },
  idparticipant: { type: DataTypes.INTEGER, allowNull: true },
  business_name: { type: DataTypes.STRING(255), allowNull: true },
  abrev: { type: DataTypes.STRING(64), allowNull: true },
  pts: { type: DataTypes.INTEGER, allowNull: true },
  pg: { type: DataTypes.INTEGER, allowNull: true },
  wo: { type: DataTypes.INTEGER, allowNull: true },
  pp: { type: DataTypes.INTEGER, allowNull: true },
  cf: { type: DataTypes.INTEGER, allowNull: true },
  ce: { type: DataTypes.INTEGER, allowNull: true },
  dc: { type: DataTypes.INTEGER, allowNull: true },
  idphase: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Phase.hasMany(Position);
Position.belongsTo(Phase, { foreignKey: "idphase" });

export default Position;
