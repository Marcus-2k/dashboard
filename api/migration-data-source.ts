import { join } from "path";
import { SnakeNamingStrategy } from "./src/modules/database/src/snake-naming.strategy";
import { DataSource, DataSourceOptions } from "typeorm";
import { entitiesForFeature } from "./src/modules/database/src/typeorm.entities.module";

const pathToMigrations = join(__dirname, "./src/migrations/*{.ts,.js}");

const config: DataSourceOptions = {
  port: 5432,
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "supercharged",
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
