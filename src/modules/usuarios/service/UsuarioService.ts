import { hash } from 'bcryptjs';
import { AppDataSource } from '../../../datasource';
import AppError from '../../../errors/AppError';
import Usuario from '../entities/Usuario';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../../../config/upload';
import { useContainer } from 'typeorm';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export class UsuarioService {
  private usuarioRepository = AppDataSource.getRepository(Usuario); //criando nosso repository

  public async criaUsuario(usuarioData: Usuario): Promise<Usuario> {
    const emailExistente = await this.usuarioRepository.findOne({
      where: {
        email: usuarioData.email,
      },
    });

    if (emailExistente) throw new AppError('O email já existe');

    //CRIPTOGRAFANDO A SENHA COM A BIBLIOTECA BCRYPTJS
    const hashSenha = await hash(usuarioData.password, 8);

    return await Usuario.create({
      nome: usuarioData.nome,
      email: usuarioData.email,
      password: hashSenha,
      avatar: usuarioData.avatar,
    }).save();
  }

  public async listaUsuarios(): Promise<Usuario[]> {
    const usuarios = this.usuarioRepository.find();
    return usuarios;
  }

  public async execute({
    user_id,
    avatarFilename,
  }: IRequest): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!usuario) {
      throw new AppError('Usuario não encontrado');
    }

    if (usuario.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        usuario.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); //retorna as informações do arquivo

      //verifica se o arquivo existe na base de dados, se existir, será removido para adicionar outro
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    usuario.avatar = avatarFilename;
    await this.usuarioRepository.save(usuario);

    return usuario;
  }

  //   public async listaProdutoPorId(id: string): Promise<Produto | null> {
  //     const produto = this.produtoRepository.findOne({
  //       where: {
  //         id,
  //       },
  //     });

  //     if (!produto)
  //       throw new AppError('Produto não encontrado pelo id informado');

  //     return produto;
  //   }

  //   public async updateProduto(
  //     id: string,
  //     novoProduto: Produto,
  //   ): Promise<Produto> {
  //     const produto = await this.produtoRepository.findOne({
  //       where: {
  //         id,
  //       },
  //     });

  //     if (!produto)
  //       throw new AppError('Produto não encontrado pelo id informado');

  //     const produtoExistente = await this.produtoRepository.findOne({
  //       where: {
  //         nome: novoProduto.nome,
  //       },
  //     });

  //     if (produtoExistente && novoProduto.nome !== produto.nome)
  //       throw new AppError('O produto já existe');

  //     (produto.nome = novoProduto.nome),
  //       (produto.preco = novoProduto.preco),
  //       (produto.quantidade = novoProduto.quantidade);

  //     await this.produtoRepository.save(produto);

  //     return produto;
  //   }

  //   public async DeleteProduto(id: string): Promise<void> {
  //     const produto = await this.produtoRepository.findOne({
  //       where: {
  //         id,
  //       },
  //     });

  //     if (!produto)
  //       throw new AppError('Produto não encontrado pelo id informado');

  //     await this.produtoRepository.remove(produto);
  //   }
}
