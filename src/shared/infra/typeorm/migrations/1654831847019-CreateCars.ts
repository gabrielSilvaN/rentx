import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1654831847019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "daily_rate",
            type: "numeric",
          },
          {
            name: "available",
            type: "boolean",
            default: true,
          },
          {
            name: "license_plate",
            type: "varchar",
          },
          {
            name: "fine_amount",
            type: "numeric",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "category_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCategoryCar",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["category_id"],
            onDelete: "CASCADE", // Se eu deixar essa constraint como SET NULL, o campo category_id deve ser nullable
            onUpdate: "CASCADE", // idem
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars");
  }
}
