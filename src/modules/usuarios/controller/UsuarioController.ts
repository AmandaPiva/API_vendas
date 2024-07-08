import { UsuarioService } from "../service/UsuarioService";
import { Request, Response } from "express";

export default class UsuarioController{
    private usuarioService = new UsuarioService();

    listaUsuarios = async (req: Request, res: Response) => {
        try{
            const usuarios = await this.usuarioService.listaUsuarios();
            return res.status(200).json(usuarios)
        }catch(error: any){
            return res.status(500).json({message: "Erro ao buscar usuários", Error: error.message})
        }
    }

    criaUsuario = async (req: Request, res: Response) => {
        try{
            const usuario = await this.usuarioService.criaUsuario(req.body)
            return res.status(201).json(usuario);
        }catch(error: any){
            return res.status(500).json({message: "Erro ao criar usuário", Error: error.message})
        }
    }
}