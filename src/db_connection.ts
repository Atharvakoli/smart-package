import { Sequelize } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";
import pg from "pg";

import config from "../database/config/config.mjs";

const env = process.env.NODE_ENV || "development";

const dbOptions = <SequelizeOptions>config[env];

dbOptions.dialectModule = pg

const sequelize = new Sequelize(dbOptions);

export default sequelize;
