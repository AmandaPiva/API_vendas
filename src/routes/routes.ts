import { Router } from "express";
import { request } from "http";
import produtoRouter from "../modules/produtos/routes/ProdutoRoute";
import usuarioRouter from "../modules/usuarios/routes/UsuarioRoute";
import authRouter from "../modules/usuarios/AuthJWT/AuthRoute";

const routes = Router();

routes.use('/produtos', produtoRouter);
routes.use('/usuarios', usuarioRouter)
routes.use('/session', authRouter)




export default routes;