import { Model, DataTypes } from "sequelize";

import sequelize from "../db_connection";

class UserPreferences extends Model {
  declare id: string;
  declare user_id: string;
  declare home_city: string;
  declare activity_Preferences: Record<string, unknown>;
  declare travel_history: Record<string, unknown>;
  
}

UserPreferences.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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


export default UserPreferences;