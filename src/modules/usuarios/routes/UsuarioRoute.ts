import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../middlewares/isAuthenticated';
import UsuarioAvatarController from '../controller/UsuarioAvatarController';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();
const usuarioAvatarController = new UsuarioAvatarController();

const upload = multer();

usuarioRouter.get('/', isAuthenticated, usuarioController.listaUsuarios);

usuarioRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      avatar: Joi.string().required(),
    },
  }),
  usuarioController.criaUsuario,
);

usuarioRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usuarioAvatarController.updateAvatar,
);

export default usuarioRouter;
