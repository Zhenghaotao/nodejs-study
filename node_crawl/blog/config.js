// MySQL 数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createCOnnection({
    host: '127.0.0.1',   //数据库地址
    port: 3306,          //数据库端口
    database: "sina_blog", //数据库名称
    user: 'root',    //数据库用户
    password: '123456' //数据库用户对应的密码
});


