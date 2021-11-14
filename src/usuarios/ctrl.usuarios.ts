import sql from "./sql.usuarios";
import per from "../services/per.controllers";
import { NextFunction, Response, Request } from "express";
const nDate = new Date().toLocaleString('bt-BR', { timeZone: 'America/Sao_Paulo' });


const controllers = {

  getUsuarios() {
    return sql.getUsuarios()
  },

  insertUsuario(req: Request) {

    let param = req.body.param
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ((param.name == "") || (param.pass == "") || (param.phone == "")) {
      return { error: "Todos os campos precisa ser preenchidos" }
    }

    if (!param.email.match(emailFormat)) {

      return { error: "emailInvalid" };
    }

    if (param.access.length >= 2) {
      return { error: "accessError" };
    }

    return { msg: 'insert ok' }
    sql.insertUsuario(req.body.param)
  }


};

export default (req: Request, res: Response, next: NextFunction) =>
  per(req, res, next, controllers);




