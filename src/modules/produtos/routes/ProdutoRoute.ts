import { Router } from 'express';
import ProdutoController from '../controller/ProdutoController';
import { celebrate, Joi, Segments } from 'celebrate';

const produtoRouter = Router();
const produtoController = new ProdutoController();

produtoRouter.get('/', produtoController.listaProdutos);

produtoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  produtoController.listaProdutoPorId,
);

produtoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      preco: Joi.number().precision(2).required(),
      quantidade: Joi.number().precision(2).required(),
    },
  }),

  produtoController.criaProduto,
);

produtoRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      preco: Joi.number().precision(2).required(),
      quantidade: Joi.number().precision(2).required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  produtoController.updateProduto,
);

produtoRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtoController.deleteProduto,
);

export default produtoRouter;
