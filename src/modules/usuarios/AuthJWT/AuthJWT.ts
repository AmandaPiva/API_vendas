import { compare } from 'bcryptjs';
import { AppDataSource } from '../../../datasource';
import AppError from '../../../errors/AppError';
import Usuario from '../entities/Usuario';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  usuario: Usuario;
  token: string;
}

class AuthJWTService {
  private usuarioRepository = AppDataSource.getRepository(Usuario); //criando nosso repository

  public async criaSessaoUsuario({
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        email,
      },
    });

    if (!usuario) throw new AppError('usuario não encontrado pelo email', 401);

    // const passwordConfirm = await compare(password, usuario.password);

    // if (!passwordConfirm) {
    //   throw new AppError('combinação de email e senha incorretos');
    // }

    //configurando o token
    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}

export default AuthJWTService;
