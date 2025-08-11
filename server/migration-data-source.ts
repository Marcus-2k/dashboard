import dotenv from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "./libs/database/src/snake-naming.strategy";
import { entitiesForFeature } from "./libs/database/src/typeorm.entities.module";

const pathToMigrations = join(
  __dirname,
  "./apps/api/src/migrations/*{.ts,.js}",
);

dotenv.config();

const config: DataSourceOptions = {
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  type: "postgres",
  synchronize: false,
  logging: true,
  dropSchema: false,
  entities: entitiesForFeature,
  migrations: [pathToMigrations],
  migrationsRun: true,
  cache: { duration: 60_000 },
  ssl: false,
  namingStrategy: new SnakeNamingStrategy(),
};

/**
 * Use specific version of node
 * nvm use 18.18.0
 */
export default new DataSource(config);
