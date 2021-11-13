import prepare from "../db/prepareSql";
import mysql from "../db/mysqlConnect";

function forDate(field: string): string {
  return `DATE_FORMAT(${field}, '%Y/%m/%d') ${field}`;
}
//legal isso

export default {
  getLogin: (param: object) => {
    let sql = `SELECT id_user, name, email, phone FROM km_user
                WHERE email = :email
                AND pass = :pass
               LIMIT 1`;
    sql = prepare.prepareSQL(sql, param);

    return mysql.query(sql);
  },

  getTry: (ip: string) => {
    let sql = `SELECT count(*) AS try, MINUTE(TIMEDIFF(NOW(), MAX(date_time))) AS minutes
      FROM km_logins_log
      WHERE ip = :ip
      AND DATE(date_time) = CURDATE()
      AND STATUS = 0`;

    sql = prepare.prepareSQL(sql, { ip });

    return mysql.query(sql);
  },

  insertTry: (ip: string, pass: string, origem: string | any) => {
    let sql = `INSERT INTO km_logins_log 
                    (ip, password, origin) 
                    VALUES 
                    ('${ip}', '${pass}', '${origem}')`;

    mysql.query(sql);
  },

  updateTry: (ip: string) => {
    let sql = `update km_logins_log
                    SET STATUS = 1
                    WHERE ip = '${ip}'
                    AND DATE(date_time) = CURDATE()`;
    mysql.query(sql);
  },
};
