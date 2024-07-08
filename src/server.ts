import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'; //biblioteca que trata excessões de erros em funções ascincronas
import cors from 'cors';
import routes from './routes/routes';
import { errors } from 'celebrate';
import AppError from './errors/AppError';
import { AppDataSource } from './datasource';
import upload from './config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.directory)); //criação de uma rota estatica para facilitar no frontend
app.use(routes); //usando o rotas

app.use(errors()); //erros que vem do celebrate

AppDataSource.initialize()
  .then(() => {
    console.info('TYPEORM - CONECTADO AO BANCO DE DADOS!');
  })
  .catch(erro => {
    console.error(
      'TYPEORM - OCORREU UM ERRO AO CONECTAR AO BANCO. ERRO: ',
      erro,
    );
  });

//USANDO A CLASSE APPERROR PARA TRATAR ERROS
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    //verifica se o erro passado é uma instancia da classe AppError
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        // se for, trás um statuscode no formato json com a mensagem de erro
        status: 'error',
        message: error.message,
      });
    }
    //se for erro do servidor, retorna esta mensagem
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(4002, () => {
  console.log('Server rodando na porta 4002');
});
