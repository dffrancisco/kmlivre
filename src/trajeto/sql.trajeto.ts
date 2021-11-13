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
  getTrajetoAberto: (param: object) => {
    let sql = `SELECT id_router, id_user, b_km, DATE_FORMAT(b_data, '%Y-%m-%d') b_data, b_hora, b_latitude, 
                b_longitude, f_km, DATE_FORMAT(f_data, '%Y-%m-%d') f_data, f_hora, f_latitude, f_longitude 
                FROM km_router
                WHERE id_user = :id_user
                and f_data IS null`;
    sql = prepare.prepareSQL(sql, param);

    return mysql.query(sql);
  },


};
