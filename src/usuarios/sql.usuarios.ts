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
  },

  alteraUsuario(param: object) {
    let sql = `UPDATE km_user 
    SET   name = :name, email = :email, phone = :phone, access = :access 
    WHERE id_user = :id_user`;

    sql = prepare.prepareSQL(sql, param);

    return mysql.query(sql);
  },


  alteraPass(param: object) {
    let sql = `UPDATE km_user 
    SET   pass = :pass 
    WHERE id_user = :id_user`;

    sql = prepare.prepareSQL(sql, param);

    return mysql.query(sql);
  },


  desativeUsuario(param: object) {
    let sql = `UPDATE km_user 
    SET   active = :active 
    WHERE id_user = :id_user`;

    sql = prepare.prepareSQL(sql, param);

    return mysql.query(sql);
  }






};
