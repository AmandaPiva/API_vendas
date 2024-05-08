import { DataSource } from "typeorm";
import { env } from "./env";
import Produto from "./modules/produtos/entities/Produto";

//CONFIGURANDO DO BANCO DE DADOS
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Produto],
    subscribers: [],
    migrations: [],
})