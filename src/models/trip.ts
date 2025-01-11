import { DataTypes, Model } from "sequelize";
import sequelize from "@/db_connection";

class Trip extends Model {
  declare user_id: string;
  declare location: string;
  declare start_date: string;
  declare end_date: string;
  declare num_people: number;
  declare sex: string;
  declare activity_type: string[];
  declare frequency: string;
}

Trip.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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

export default Trip;
