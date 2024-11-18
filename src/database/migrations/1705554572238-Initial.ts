import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1705554572238 implements MigrationInterface {
    name = 'Initial1705554572238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "email" character varying(255) NOT NULL, "password_hash" character varying(512) NOT NULL, "user_type" character varying(50) NOT NULL DEFAULT 'user', "verified" boolean NOT NULL DEFAULT false, "last_login" TIMESTAMP, "api_key" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
