import { NextFunction, Response, Request } from "express";
import auth from "./auth";
import util from "./util";

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
  controllers: object | any
) => {
  try {
    if (req.body.call == undefined) throw new Error("call not found");

    if (req.headers['authorization'] != undefined) {
      controllers.usuario = await auth.decodeToken(req.headers['authorization'])
      controllers.usuario.id_user = util.base64_decode(controllers.usuario.id_user)
    }

    if (controllers[req.body.call] == undefined)
      throw new Error("function undefined in controllers");

    let rs = await controllers[req.body.call](req, res, next);

    if (rs.status != undefined) return res.status(rs.status).send(rs.data);

    if (rs.data != undefined) return res.send(rs.data);

    return res.send(rs);
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
};
