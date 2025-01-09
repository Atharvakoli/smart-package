import { Model, DataTypes } from "sequelize";
import sequelize from "../db_connection";

class User extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare contactNumber: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default User;
