const env = process.env.NODE_ENV
let MYSQL_CONF
let REDIS_CONF

MYSQL_CONF = {
    host:'localhost',
    user:'root',
    password: 'zzm20020615',
    database: 'blogsql',
    port: 3306
}
module.exports = {
    MYSQL_CONF
}