const mysql = require('mysql')
const {MYSQL_CONF} = require('../config/db')
const con = mysql.createConnection(MYSQL_CONF)
con.connect((err)=>{
    if(err) throw err;
    console.log('数据库连接成功!');
})
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        })
    })
    return promise
}



module.exports = {
    exec
}