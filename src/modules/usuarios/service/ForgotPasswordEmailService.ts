import { AppDataSource } from '../../../datasource';
import UsuarioToken from '../entities/UsuarioToken';
import Usuario from '../entities/Usuario';
import AppError from '../../../errors/AppError';

interface IRequest {
  email: string;
  user_id: string;
}

export class SendForgotPasswordEmailSend {
  private usuarioRepository = AppDataSource.getRepository(Usuario); //criando nosso repository
  private usuarioTokensRepository = AppDataSource.getRepository(UsuarioToken);

  public async executa({ email, user_id }: IRequest): Promise<UsuarioToken> {
    const userTokenRepository = this.usuarioRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!userTokenRepository) throw new AppError('O email já existe');

    const token = await this.usuarioTokensRepository
      .create({
        usuarioId: user_id,
      })
      .save();

    return token;
  }
}
