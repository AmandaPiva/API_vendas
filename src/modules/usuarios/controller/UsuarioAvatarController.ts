import { UsuarioService } from '../service/UsuarioService';
import { Request, Response } from 'express';

export default class UsuarioAvatarController {
  private usuarioService = new UsuarioService();

  updateAvatar = async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.file) {
        return res.status(400).json({ message: 'Requisição inválida' });
      }

      const usuario = await this.usuarioService.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      });

      return res.json(usuario);
    } catch (error: any) {
      return res
        .status(500)
        .json({
          message: 'Erro ao atualizar avatar do usuário',
          error: error.message,
        });
    }
  };
}
