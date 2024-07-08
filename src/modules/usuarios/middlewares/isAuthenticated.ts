import { request } from 'http';
import { NextFunction, Request, Response } from 'express';
import AppError from '../../../errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth'

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string
}

//MIDDLEWARE
export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization; //armazenar o conteúdo do header (token)

    if(!authHeader) {
        throw new AppError('JWT Token is missing');
    }

    //PEGA O TOKEN ARMAZENADO E DIVIDE ELE EM DUAS PARTES USANDO O .split [ ,token] 
    //O ESPAÇO EM BRANCO SERIA O Bearer, o token se refere a hash em si, PORÉM O SPLIT RETIRA O Bearer E SUBSTITUI POR ' '
    //DEIXANDO SOMENTE A HASH
    //Bearer jdksjdjskfdfdkfjdfnmgurhijeknskdodjidjgjbfnhbrjnke
    const [ ,token] = authHeader.split(' ');

    //AQUI ELE VERIFICA SE O TOKEN É VÁLIDO USANDO O ARQUIVO QUE CONTÉM A HASH
    try{
        const decodeToken = verify(token, authConfig.jwt.secret);

        //COMO PEGAR O ID DO TOKEN DE CADA USUÁRIO AUTENTICADO
        //defina uma interface com os atributos que possui o nosso payload do token para tipar os dados corretamente
        const {sub} = decodeToken as TokenPayload;

        
        request.user = {
            id: sub
        }

        return next(); //SE FOR VÁLIDO ELE CONTINUA E AUTORIZA A CONTINUAR A APLICAÇÃO
    }catch{
        throw new AppError('Invalid JWT token');
    }
}