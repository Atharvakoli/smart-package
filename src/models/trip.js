import { DataTypes, Model } from "sequelize";
import sequelize from "../db_connection";

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["male", "female", "other"]],
      },
    },
    activity_type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["light", "moderate", "intensive"]],
      },
    },
  },
  {
    tableName: "trips",
    sequelize,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export { Trip };
