import prepare from "../db/prepareSql";
import mysql from "../db/mysqlConnect";

export default {
  getUsuarios: () => {
    let sql = `SELECT id_user, name, email, phone, DATE_FORMAT (date_in, '%Y-%m-%d') date_in, access
                FROM km_user
                WHERE active = "S"`;

    return mysql.query(sql);
  },

  insertUsuario(param: object) {
    let sql = `INSERT INTO km_user (name, email, pass, phone, access)
    VALUES (:name, :email, :pass, :phone, :access)`;

    sql = prepare.prepareSQL(sql, param);

    return mysql.query(sql);
  }






};
