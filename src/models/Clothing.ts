import { Model, DataTypes } from "sequelize";
import sequelize from "../db_connection"; 

class Clothing extends Model {
  declare id: string;
  declare clothing_type: string;
  declare temperature_min: number;
  declare temperature_max: number;
  declare activity_type: string;
  declare ranking: number;
}

Clothing.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    clothing_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperature_min: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    temperature_max: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    activity_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "clothings", 
    sequelize, 
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
);

export default Clothing;
