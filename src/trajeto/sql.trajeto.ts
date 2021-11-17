import prepare from "../db/prepareSql";
import mysql from "../db/mysqlConnect";

export default {

  getTrajetos: (param: object) => {
    let sql = `SELECT id_router, id_user, b_km, DATE_FORMAT(b_data, '%Y-%m-%d') b_data, b_hora, b_latitude, 
                b_longitude, f_km, DATE_FORMAT(f_data, '%Y-%m-%d') f_data, f_hora, f_latitude, f_longitude 
                FROM km_router
                WHERE id_user = :id_user`;
    sql = prepare.prepareSQL(sql, param);

    return mysql.query(sql);
  },

  getTrajetoAberto: (id_user: string) => {
    let sql = `SELECT id_router, id_user, b_km, DATE_FORMAT(b_data, '%Y-%m-%d') b_data, b_hora, b_latitude, 
                b_longitude, f_km, DATE_FORMAT(f_data, '%Y-%m-%d') f_data, f_hora, f_latitude, f_longitude 
                FROM km_router
                WHERE id_user = ${id_user}
                and f_data IS null`;

    return mysql.query(sql);
  },

  iniciaTrajeto(param: object) {

    let sql = `INSERT into km_router
               (id_user, b_km, b_data, b_hora, b_latitude, b_longitude)   
               values
               (:id_user, :km, :data, :hora, :latitude, :longitude)`;

    sql = prepare.prepareSQL(sql, param);

    return mysql.query(sql);
  },

  finalizarTrajeto(param: object) {
    let sql = `UPDATE km_router
                SET f_km = :km, 
                  f_data = :data,
                  f_hora= :hora,
                  f_latitude = :latitude,
                  f_longitude = :longitude		
              WHERE id_user = :id_user`

    sql = prepare.prepareSQL(sql, param);

    return mysql.query(sql);
  }


};
