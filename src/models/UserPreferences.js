import { Model, DataTypes } from "sequelize";
import sequelize from "../db_connection";

class UserPreferences extends Model {}

UserPreferences.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    home_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_preferences: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    travel_history: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "userPreferences",
    sequelize,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export { UserPreferences };
