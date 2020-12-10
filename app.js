/* Includes: */
var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var pathname = url.parse(req.url, true).pathname

    if (req.url == "/calc") {

        fs.readFile('jscalc.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
    else if (pathname == "/compute") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var q = url.parse(req.url, true).query;
        var op = q.op;
        var operations = ["+", "-", "*", "/"];
        var opIndex = 0;
        var txt = "";
        if (op == "plus") {
            opIndex = 0;
            txt = parseInt(q.x) + parseInt(q.y);
        }
        else if (op == "minus") {
            opIndex = 1;
            txt = parseInt(q.x) - parseInt(q.y);
        }
        else if (op == "times") {
            opIndex = 2;
            txt = parseInt(q.x) * parseInt(q.y);
        }
        else if (op == "delat") {
            opIndex = 3;
            txt = parseInt(q.x) / parseInt(q.y);
        }
        var expr = q.x + " " + operations[opIndex] + " " + q.y + " = " + txt;
        return res.end(expr.toString());
    }
    else if (req.url == "/") {
        fs.readFile('calculate.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
    else {
        res.write("Fel!");
        res.end();
    }
}).listen(8080);