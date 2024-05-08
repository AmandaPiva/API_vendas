import { Router } from "express";
import { request } from "http";
import produtoRouter from "../modules/produtos/routes/ProdutoRoute";

const routes = Router();

routes.use('/produtos', produtoRouter);




export default routes;