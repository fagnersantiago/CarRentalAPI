import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1635882870009 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cars',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'descritpion',
                        type: 'varchar',
                    },
                    {
                        name: 'daily_rate',
                        type: 'numeric',
                    },
                    {
                        name: 'available',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'license_plate',
                        type: 'varchar',
                    },
                    {
                        name: 'fine_amount',
                        type: 'numeric',
                    },
                    {
                        name: 'brand',
                        type: 'varchar',
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                //Referenciando uma chave estrangeira
                foreignKeys: [
                    {
                        name: 'FKCategoryCar',
                        //Referenciando a tabela da chave estrangeira
                        referencedTableName: 'categories',
                        //Referenciando a coluna
                        referencedColumnNames: ['id'],
                        //Referenciando a nome da coluna
                        columnNames: ['category_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars');
    }
}
