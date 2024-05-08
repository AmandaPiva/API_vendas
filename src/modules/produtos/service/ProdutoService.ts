import { AppDataSource } from "../../../datasource";
import AppError from "../../../errors/AppError";
import Produto from "../entities/Produto";



export class ProutoService{
    private produtoRepository = AppDataSource.getRepository(Produto); //criando nosso repository

    public async criaProduto(produtoData: Produto): Promise<Produto>{
        const produtoExistente = await this.produtoRepository.findOne({
            where: {
                nome: produtoData.nome,
            }
        })

        if(produtoExistente) throw new AppError('O produto já existe' );

        return await Produto.create({
           nome: produtoData.nome,
            preco: produtoData.preco,
            quantidade: produtoData.quantidade
        }).save()
    }

    public async listaProdutos(): Promise<Produto[]>{
        const produtos = this.produtoRepository.find();
        return produtos;
    }

    public async listaProdutoPorId(id: string): Promise<Produto | null>{
        const produto = this.produtoRepository.findOne({
            where: {
                id,
            }
        })

        if(!produto)
        throw new AppError("Produto não encontrado pelo id informado");

        return produto
    }

    public async updateProduto(id: string, novoProduto: Produto): Promise<Produto>{
        const produto = await this.produtoRepository.findOne({
            where: {
                id,
            }
        })

        if(!produto)
        throw new AppError("Produto não encontrado pelo id informado");

        const produtoExistente = await this.produtoRepository.findOne({
            where: {
                nome: novoProduto.nome,
            }
        })

        if(produtoExistente && novoProduto.nome !== produto.nome) throw new AppError('O produto já existe' );

        produto.nome = novoProduto.nome,
        produto.preco = novoProduto.preco,
        produto.quantidade = novoProduto.quantidade

        await this.produtoRepository.save(produto)
        
        return produto
    }

    public async DeleteProduto(id: string): Promise<void>{
        const produto = await this.produtoRepository.findOne({
            where: {
                id,
            }
        })

        if(!produto)
        throw new AppError("Produto não encontrado pelo id informado");

        await this.produtoRepository.remove(produto);
    }
} 