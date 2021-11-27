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

    if (param.pass == "") {
      return { error: "InvalidPass" };
    }

    return sql.insertUsuario(req.body.param)
  },

  alteraUsuario(req: Request) {

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
    return sql.alteraUsuario(req.body.param)
  },

  desativeUsuario(req: Request) {
    return sql.desativeUsuario(req.body.param)
  },

  alteraPass(req: Request) {

    let param = req.body.param

    if (param.pass == "") {
      return { error: "InvalidPass" };
    }
    return sql.alteraPass(req.body.param)
  },


};

export default (req: Request, res: Response, next: NextFunction) =>
  per(req, res, next, controllers);




