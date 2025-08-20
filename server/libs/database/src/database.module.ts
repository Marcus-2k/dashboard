import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { SnakeNamingStrategy } from "./snake-naming.strategy";
import { TypeOrmEntities, entitiesForFeature } from "./typeorm.entities.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      extraProviders: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const pathToMigrations = join(__dirname, "./migrations/*.js");

        const config: TypeOrmModuleOptions = {
          type: "postgres",
          host: configService.getOrThrow<string>("POSTGRES_HOST"),
          port: configService.getOrThrow<number>("POSTGRES_PORT"),
          username: configService.getOrThrow<string>("POSTGRES_USER"),
          password: configService.getOrThrow<string>("POSTGRES_PASSWORD"),
          database: configService.getOrThrow<string>("POSTGRES_DATABASE"),
          synchronize: false,
          logging: true,
          dropSchema: false,
          namingStrategy: new SnakeNamingStrategy(),
          entities: entitiesForFeature,
          migrations: [pathToMigrations],
          migrationsRun: true,
          cache: {
            duration: 60_000,
          },
          ssl:
            process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "dev"
              ? { rejectUnauthorized: false }
              : false,
        };

        return config;
      },
    }),
    TypeOrmEntities,
  ],
  providers: [],
  exports: [TypeOrmEntities, TypeOrmModule],
})
export class DatabaseModule {}
