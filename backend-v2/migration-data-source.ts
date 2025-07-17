import { join } from "path";
import { entitiesForFeature } from "./src/modules/database/src/typeorm.entities.module";
import { DataSource, DataSourceOptions } from "typeorm";

const pathToMigrations = join(__dirname, "./src/migrations/*{.ts,.js}");

console.log("pathToMigrations", pathToMigrations);

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
  entities: [entitiesForFeature as any],
  migrations: [pathToMigrations],
  migrationsRun: true,
  cache: { duration: 60_000 },
  ssl: false,
};
export default new DataSource(config);
