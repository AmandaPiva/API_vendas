import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthController from './AuthController';

const authRouter = Router();
const authController = new AuthController();


authRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  authController.create,
);

export default authRouter;