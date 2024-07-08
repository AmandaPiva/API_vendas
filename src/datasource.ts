import { DataSource } from 'typeorm';
import { env } from './env';
import Produto from './modules/produtos/entities/Produto';
import Usuario from './modules/usuarios/entities/Usuario';
import UsuarioToken from './modules/usuarios/entities/UsuarioToken';

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
  entities: [Produto, Usuario, UsuarioToken],
  subscribers: [],
  migrations: [],
});
