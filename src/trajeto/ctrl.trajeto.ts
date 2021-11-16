import sql from "./sql.trajeto";
import per from "../services/per.controllers";
import { NextFunction, Response, Request } from "express";
import { iUsuario } from '../models/interfaces'
import util from "../services/util";
import moment from 'moment'

// const nDate = new Date().toLocaleString('bt-BR', { timeZone: 'America/Sao_Paulo' });
moment.locale('pt-br');

// moment().tz("America/Sao_Paulo").format();

// console.log('scp', nDate);

// console.log('mo-ndate', moment().format(nDate))
// console.log('mo', moment(nDate, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss'))
// console.log('HORA', moment().format('LTS'))

const helper = {
  getHora() {
    const nDate = new Date().toLocaleString('bt-BR', { timeZone: 'America/Sao_Paulo' });
    return moment(nDate, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss')
  },
  getDate() {
    const nDate = new Date().toLocaleString('bt-BR', { timeZone: 'America/Sao_Paulo' });
    return moment(nDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
  }
}


console.log(helper.getHora(), 'hora');
console.log(helper.getDate(), 'data');

const controllers = {
  usuario: <iUsuario>{},

  getTrajetos: async (req: Request) => {
    return await sql.getTrajetos(req.body.param)
  },

  getTrajetoAberto: async (req: Request) => {
    return await sql.getTrajetoAberto(controllers.usuario.id_user)
  },

  async iniciaTrajeto(req: Request) {

    let { param } = req.body

    // param.data = moment().format('YYYY-MM-DD')
    // param.hora = moment().format('LTS')
    param.data = helper.getDate()
    param.hora = helper.getHora()

    param.id_user = controllers.usuario.id_user


    try {
      await sql.iniciaTrajeto(param)
      return { msg: 'ok' }
    } catch (error) {
      return { error: error }
    }

  },

  async finalizarTrajeto(req: Request) {
    let { param } = req.body

    // param.data = moment().format('YYYY-MM-DD')
    // param.hora = moment().format('LTS')
    param.data = helper.getDate()
    param.hora = helper.getHora()
    param.id_user = controllers.usuario.id_user

    try {
      await sql.finalizarTrajeto(param)
      return { msg: 'ok' }
    } catch (error) {
      return { error: error }
    }

  }


};

export default (req: Request, res: Response, next: NextFunction) =>
  per(req, res, next, controllers);




