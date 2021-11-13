import dotenv from 'dotenv'
import { createPool } from "mysql";
dotenv.config()

const connection = createPool({
    connectionLimit: 100,
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

export default {
    query: (sql: string) => {
        return new Promise((res, rej) => {
            connection.query(sql, (error, results) => {
                if (error) {
                    res(error)
                    console.log(error);
                }
                else
                    res(JSON.parse(JSON.stringify(results)))
            })

        })
    },

    queryParam: (sql: string, param: object) => {
        return new Promise((res, rej) => {
            connection.query(sql, param, (error, results) => {
                if (error) {
                    res(error)
                }
                else
                    res(JSON.parse(JSON.stringify(results)))
            })

        })
    },

}

