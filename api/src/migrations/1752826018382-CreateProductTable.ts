import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1752826018382 implements MigrationInterface {
  name = "CreateProductTable1752826018382";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "price" numeric NOT NULL,
        "discount_price" numeric,
        "created_at_utc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at_utc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "deleted_at_utc" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
