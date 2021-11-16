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
  getDateTime() {
    const nDate = new Date().toLocaleString('bt-BR', { timeZone: 'America/Sao_Paulo' });
    let _date = nDate.split(' ')[0]
    let _time = nDate.split(' ')[1]
    let _AM_PM = nDate.split(' ')[2]
    let _d = _date.split('/')

    console.log(nDate, _date, _time, _AM_PM, _d);

    _date = `${_d[2].replace(',', '')}/${_d[1]}/${_d[0]}`


    if (_AM_PM == 'PM') {
      let pm = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0]
      let am = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

      let t = _time.split(':');
      let index = am.indexOf(Number(t[0]))
      let h = pm[index]
      t[0] = h.toString();
      _time = `${t[0]}:${t[1]}:${t[2]}`

    }

    return {
      date: _date,
      time: _time
    }
  },

  getHora() {
    const nDate = new Date().toLocaleString('bt-BR', { timeZone: 'America/Sao_Paulo' });
    return moment(nDate, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss')
  },

  getDate() {
    const nDate = new Date().toLocaleString('bt-BR', { timeZone: 'America/Sao_Paulo' });
    return moment(nDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
  }
}


console.log(helper.getDateTime());

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

    param.data = helper.getDateTime().date
    param.hora = helper.getDateTime().time

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
    param.data = helper.getDateTime().date
    param.hora = helper.getDateTime().time
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




