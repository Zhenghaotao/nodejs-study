var cheerio = require('cheerio');

//通过 load方法把html代码转换成一个jQuery对象
var $ = cheerio.load('<h2 class="title">Hello World</h2>');
//可以使用与　jQuery 一样的语法来操作
$('h2.title').text('Hello there!');
$('h2').addClass('welcome');


console.log($.html());


