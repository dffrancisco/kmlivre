import sql from "./sql.trajeto";
import per from "../services/per.controllers";
import { NextFunction, Response, Request } from "express";
const nDate = new Date().toLocaleString('bt-BR', {
  timeZone: 'America/Sao_Paulo'
});

interface iTry {
  try: string
  minutes: string
}

const controllers = {
  getTrajetos: async (req: Request) => {
    return await sql.getTrajetos(req.body.param)
  },

  getTrajetoAberto: async (req: Request) => {
    return await sql.getTrajetoAberto(req.body.param)
  },
};

export default (req: Request, res: Response, next: NextFunction) =>
  per(req, res, next, controllers);




