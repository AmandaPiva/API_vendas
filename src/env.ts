import {z} from 'zod';
import { randomUUID } from 'crypto';
import 'dotenv/config';

//ARQUIVO DE CONFIGURAÇÃO
const envSchema = z.object({
    //VARIÁVEIS DE AMBIENTE DO NODE.JS QUE CARREGAM UM VALOR PADRÃO CASO NÃO SEJAM PRÉ DEFINIDAS
    JWT_PASS: z.string().default(randomUUID()),
    ADMIN_PASS: z.string().default(randomUUID()),
    ERVER_ORIGIN: z.string().default(`http://localhost:4002`),
    SERVER_URL: z.string().default(`http://localhost:4002`),
    SERVER_NAME: z.string().default(`localhost:4002`),
    SERVER_PORT: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().gte(3000, 'Must be 3000 and above'),
    ),

    DB_HOST: z.string().default('db_netserv_blip'),
    DB_PORT: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().gte(1000, 'Must be 1000 and above'),
    ),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_NAME: z.string(),


})

export const env = envSchema.parse(process.env);