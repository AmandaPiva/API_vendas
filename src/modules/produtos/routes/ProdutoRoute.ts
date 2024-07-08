import { Router } from 'express';
import ProdutoController from '../controller/ProdutoController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../usuarios/middlewares/isAuthenticated';

const produtoRouter = Router();
const produtoController = new ProdutoController();

produtoRouter.get('/', isAuthenticated, produtoController.listaProdutos);

produtoRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  produtoController.listaProdutoPorId,
);

produtoRouter.post(
  '/',
  isAuthenticated,
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
  isAuthenticated,
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
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtoController.deleteProduto,
);

export default produtoRouter;
