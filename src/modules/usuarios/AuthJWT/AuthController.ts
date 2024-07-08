import { UsuarioService } from "../service/UsuarioService"
import { Request, Response } from "express";
import authRouter from './AuthRoute';
import AuthJWTService from "./AuthJWT";

export default class AuthController{
 

    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
    
        const authJWTService = new AuthJWTService();
    
        const user = await authJWTService.criaSessaoUsuario({
          email,
          password,
        });
    
        return response.json(user);
      }
}