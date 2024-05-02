import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import Phase from "./PhaseModel.js";

const { DataTypes } = Sequelize;

const GroupsTable = db.define(
  "groupsTable",
  {
    idgroup: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idparticipant: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    abrev: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    groupAsciiLetter: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    orderGroup: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    denomination: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    image_path: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    idphase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusDB: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    // freezeTableName: true,
  }
);

Phase.hasMany(GroupsTable);
GroupsTable.belongsTo(Phase, { foreignKey: "idphase" });

export default GroupsTable;