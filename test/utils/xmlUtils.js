/**
 * Created by brainstorm on 2017/5/14.
 */
var fs = require('fs');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/HHQ-7_20151201092044.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log('Done');
    });
});