

const insert = (table: string, objectFields: [], returnID_Name: string = '') => {

    let sql = `INSERT INTO ${table} `;

    let fieldName = '('
    let fieldValue = '('

    for (let key in objectFields) {
        fieldName += key + ', '
        fieldValue += `:${key}, `
    }

    sql = sql + fieldName.substr(0, fieldName.length - 2) + ') values ' + fieldValue.substring(0, fieldValue.length - 2) + ')'

    if (returnID_Name != '')
        sql += ' RETURNING ' + returnID_Name

    sql = prepareSQL(sql, objectFields)

    return sql

}

const insertParam = (table: string, objectFields: [], returnID_Name: string) => {

    let sql = `INSERT INTO ${table} `;

    let fieldName = '('
    let fieldValue = '('
    let objectValues: [] = []

    for (let key in objectFields) {

        fieldName += key + ', '
        fieldValue += `?, `
        objectValues.push(objectFields[key])
    }

    sql = sql + fieldName.substr(0, fieldName.length - 2) + ') values ' + fieldValue.substring(0, fieldValue.length - 2) + ')'

    if (returnID_Name != '')
        sql += ' RETURNING ' + returnID_Name

    return { sql, objectValues }

}

const update = (table: string, objectFields: [], where: string, and = '', printSql = false) => {

    let sqlField = ''
    let objectValues = {};

    for (let key in objectFields) {
        sqlField += key + ` = :${key}, `
        // objectValues[`:${key}`] = objectFields[key]
    }

    sqlField = sqlField.substr(0, sqlField.length - 2)


    let sql = `update ${table} set ${sqlField} where ${where} `

    if (and != '')
        sql += and

    sql = prepareSQL(sql, objectFields)

    if (printSql) {
        console.log(sql);
    }

    return sql
}

const updateParam = (table: string, objectFields: [], where: string, and = '') => {

    let sqlField = ''
    let objectValues: [] = [];

    for (let key in objectFields) {
        sqlField += key + ` = ?, `
        objectValues.push(objectFields[key])
    }

    sqlField = sqlField.substr(0, sqlField.length - 2)


    let sql = `update ${table} set ${sqlField} where ${where} `

    if (and != '')
        sql += and


    return { sql, objectValues }

    // {  
    //      sql : 'update tabela set field1 = ?, field2 = ?',
    //     objectValues: ['aaa', 'bbbb'] 
    // }


}

const prepareSQL = (sql: string, param: object | any, printSql = false) => {

    function addslashes(str: string) {
        // return str
        return str.replace(/'/g, '"')


        // return str.replace(/&/g, '&amp;')
        //     .replace(/'/g, '&apos;')
        //     .replace(/"/g, '&quot;')
        //     .replace(/\\/g, '\\\\')
        //     .replace(/</g, '&lt;')
        //     .replace(/'|\\'/g, "\\'")
        //     .replace(/>/g, '&gt;')
        //     .replace(/\u0000/g, '\\0');
    }

    for (let key in param) {
        let value: string = param[key]
        if (typeof param[key] == 'string')
            value = `'${addslashes(param[key])}'`
        sql = sql.replace(new RegExp(`:${key}`, 'g'), value)
    }

    if (printSql)
        console.log(sql);

    return sql

}

export default {
    insert,
    insertParam,
    update,
    updateParam,
    prepareSQL
}