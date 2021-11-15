import sql from "./sql.trajeto";
import per from "../services/per.controllers";
import { NextFunction, Response, Request } from "express";
import util from "../services/util";
const nDate = new Date().toLocaleString('bt-BR', {
  timeZone: 'America/Sao_Paulo'
});

interface iTry {
  try: string
  minutes: string
}

interface iUsuario {
  id_user: string
  name: string
  email: string
  phone: string
  access: string
}

const controllers = {
  usuario: <iUsuario>{},

  getTrajetos: async (req: Request) => {
    return await sql.getTrajetos(req.body.param)
  },

  getTrajetoAberto: async (req: Request) => {
    return await sql.getTrajetoAberto(controllers.usuario.id_user)
  },
};

export default (req: Request, res: Response, next: NextFunction) =>
  per(req, res, next, controllers);




