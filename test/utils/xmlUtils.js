/**
 * Created by brainstorm on 2017/5/14.
 */
var fs = require('fs');
var xml2js = require('xml2js');
var async = require('async');

var parser = new xml2js.Parser();

function xml2json(file, callback) {
    fs.readFile(file, function(err, data) {
        parser.parseString(data, function (err, result) {
            callback(result);
        });
    });
}

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }

    })

}

var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
};

module.exports = {
    getXml4Model: function (callback) {
        var lists;
        var models = new Map();
        lists = getFiles.getFileList(__dirname + "/../data/");

        async.each(lists, function(itm, callback) {
            xml2json(itm.path+itm.filename, function (result) {
                // console.log(result.task.model.toString());
                if (models.has(result.task.model.toString())) {
                    var no = models.get(result.task.model.toString()) + 1;
                    models.set(result.task.model.toString(), no);
                } else {
                    models.set(result.task.model.toString(), 1);
                }
                callback();
            });
        }, function(err){
            console.log("err is:" + err);
            callback(models);
        })
    },

    getXml4Tasks: function (model, callback) {
        var lists;
        var tasks = [];
        lists = getFiles.getFileList(__dirname + "/../data/");

        async.each(lists, function(itm, callback) {
            xml2json(itm.path+itm.filename, function (result) {
                if (model === result.task.model.toString()) {
                    tasks.push(result.task);
                }
                callback();
            });
        }, function(err){
            console.log("err is:" + tasks);
            callback(tasks);
        })
    },
};
