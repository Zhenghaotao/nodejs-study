/**
 * Created by taotao on 15-8-20.
 */
var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:update:save');

/**
 * 保存文章分类
 * @param list
 * @param callback
 */
exports.classList = function (list, callback) {
    debug('保存文章分类列表到数据库中: %d', list.length);
    async.eachSeries(list, function (item, next) {
        //查询分类是否已经存在
        db.query('SELECT * FROM `class_list` WHERE `id`=? LIMIT 1', [item.id], function (err, data) {
            if (err)
                return next(err);
            if (Array.isArray(data) && data.length >= 1) {
                //分类已存在，更新一下
                db.query('UPDATE `class_list` SET `name`=?,`url`=? WHERE `id`=?', [item.name, item.url, item.id], next);

            } else {
                //分类不存在,添加
                db.query('INSERT INTO `class_list`(`id`,`name`,`url`) VALUES (?,?,?)', [item.id, item.name, item.url], next);
            }
        });
    }, callback);
};

/**
 *
 * 保存文章分类
 * @param class_id
 * @param list
 * @param callback
 */
exports.articleList = function (class_id, list, callback) {
    debug('保存文章到数据库中: %d,%d', class_id, list.length);
    async.eachSeries(list, function (err, next) {
        //查询文章是否已存在
        db.query('SELECT * FROM `article_list` WHERE `id`=? AND `class_id`=? LIMIT 1', [item.id, class_id], function (err, data) {
            if (err)
                return next();
            var create_time = new Date(item.time).getTime() / 1000;

            if (Array.isArray(data) && data.length >= 1) {
                //分类已存在,更新一下
                db.query('UPDATE `article_list` SET `title=?`, `url`=?, `class_id`=?, `create_time`=? WHERE `id`=? AND `class_id`=?',
                    [item.title, item.url, class_id, create_time, item.id, class_id], next);
            } else {
                //分类不存在,添加
                db.query('INSERT INTO `article_list`(`id`,`title`,`url`,`class_id`,`create_time`) VALUES (?,?,?,?,?)',
                    [item.id, item.title, item.url, class_id, create_time], next);
            }
        });
    }, callback);
};
/**
 * 保存文章分类的文章数量
 * @param class_id
 * @param count
 * @param callback
 */
exports.articleCount = function(class_id,count,callback){
    debug('保存文章分类的文章数量: %d,%d',class_id,count);
    db.query('UPDATE `class_list` SET `count`=? WHERE `id`=?',[count,class_id],callback);
}
/**
 * 保存文章标签.
 */
exports.articleTags = function(id,tags,callback){
    debug('保存文章:%s,%s',id,tags);
    //删除旧的日志标签信息
    db.query('DELETE FROM `article_tag` WHERE `id`=?',[id],function(err){
        if(err)
            return callback(err);
        if(tags.length > 0){
            //添加新标签
            //生成 sql　代码
            var values = tags.map(function(tag){
                return '(' + db.escape(id)+', '+db.escape(tag) + ')';
            }).join(', ');
            db.query('INSERT INTO `article_tag`(`id`,`tag`) VALUES ' + values,callback);
        } else {
            //如果没有标签，直接返回
            callback(null);
        }
    });
}

/**
 * 保存文章内容
 */
exports.articleDetail = function(id,tags,content,callback){
    debug('保存文章内容: %s',id);
    //检查ｗｅｎ
}








