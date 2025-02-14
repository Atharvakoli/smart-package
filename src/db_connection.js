import { Sequelize } from "sequelize";
import config from "../database/config/config.mjs";

const env = process.env.NODE_ENV || "development";
const dbOptions = config[env];

const sequelize = new Sequelize(dbOptions);

export default sequelize;
