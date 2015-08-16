var mysql = require('mysql');
//创建数据库链接;
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
});
connection.connect();

//执行查询
connection.query('SELECT 1 + 1 AS solution',function(err,rows){
	if(err) 
		throw err;
	console.log('The solution is: ' + rows[0],solution);
	//关闭链接
	connection.end();
});



