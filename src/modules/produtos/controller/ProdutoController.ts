import { Request, Response } from "express";
import { ProutoService } from '../service/ProdutoService';
import Produto from '../entities/Produto';

export default class ProdutoController{
    private produtoService = new ProutoService()

    listaProdutos = async (req: Request, res: Response) => {
        try{
            const produtos = await this.produtoService.listaProdutos();
            return res.status(200).json(produtos)
        }catch(error: any){
            return res.status(500).json({message: "Erro ao listar produtos", Error: error.message})
        }   
    }

    listaProdutoPorId = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            const produto = await this.produtoService.listaProdutoPorId(id);

            if(!produto){
                return res.status(404).json({message: "Produto não encontrado pelo id informado"})
            }
            return res.status(200).json(produto)
        }catch(error:any){
            return res.status(500).json({message: "Produto não encontrado", Error: error.message})
        }
    }

    criaProduto = async (req: Request, res: Response) => {
        try{
         const produto = await this.produtoService.criaProduto(req.body)

         return res.status(201).json(produto);
        } catch (error: any){
            return res.status(500).json({message: "Erro ao criar produto", Error: error.message})
        }
    }

    updateProduto = async (req: Request, res: Response) => {
        try{
            const produto = req.body;
            const id = req.params.id;
 
            const produtoAtualizado = await this.produtoService.updateProduto(id, produto);

            if(!produtoAtualizado){
                return res.status(200).json({message: "Produto não encontrado"});
            }
            return res.status(200).json(produtoAtualizado)
        } catch(error: any){
            return res.status(500).json({message: "Erro ao atualizar um produto"})
        }
    }

    deleteProduto = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;

            const produto = await this.produtoService.DeleteProduto(id);
            return res.status(200).json(produto)

        } catch(error: any){
            return res.status(200).json({message: "Erro ao deletar um produto"})

        }
    }
}