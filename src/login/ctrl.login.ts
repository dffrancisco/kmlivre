import sql from "./sql.login";
import authADM from "../services/auth";
import per from "../services/per.controllers";
import { NextFunction, Response, Request } from "express";
import md5 from "md5";

interface iTry {
  try: string
  minutes: string
}

const controllers = {
  getLogin: async (req: Request) => {
    try {
      if (req.body.email == "") return { error: "noEmail" };
      if (req.body.pass == "") return { error: "noPass" };


      const getTry: any = await sql.getTry(req.ip);


      if (parseInt(getTry[0].try) >= 5) {
        if (getTry[0].try != "" && parseInt(getTry[0].minutes) <= 10)
          return {
            error:
              "Você excedeu o limite de 5 tentativas, login bloqueado por 30 minutos!",
          };
      }



      const user: any = await sql.getLogin(req.body.param);

      if (user.length == 0) {
        sql.insertTry(req.ip, req.body.pass, req.headers.host);
        return {
          error: "Usuário ou Senha não confere (" + (getTry[0].try + 1) + ")",
        };
      }

      sql.updateTry(req.ip);

      user[0].id_user = md5(user[0].id_user);

      let token = await authADM.generateToken(user[0], "100d");

      user[0].token = token;

      return user[0];
    } catch (error) {
      console.log(error);
    }
  },
};

export default (req: Request, res: Response, next: NextFunction) =>
  per(req, res, next, controllers);




