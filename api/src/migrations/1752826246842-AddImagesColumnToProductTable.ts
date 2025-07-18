import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagesColumnToProductTable1752826246842
  implements MigrationInterface
{
  name = "AddImagesColumnToProductTable1752826246842";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "images" character varying array NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "images"`);
  }
}
