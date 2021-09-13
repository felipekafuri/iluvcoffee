import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1631309731567 implements MigrationInterface {
  name = 'SchemaSync1631309731567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."coffees" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."coffees" DROP COLUMN "description"`,
    );
  }
}
