var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var pathname = url.parse(req.url, true).pathname
    //Shows calculator
    if (req.url == "/calc") {

        fs.readFile('jscalc.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
    //Calculate with input parameters
    else if (pathname == "/compute") {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write("<!DOCKTYPE html >\n");
        res.write("     <html>\n");
        res.write("         <head>\n");
        res.write("             <title>" + "Calculation" + "</title>\n")
        res.write("         </head>\n");
        res.write("         <body>\n");
        res.write("             <h2>" + "Compute page" + "</h2>\n")
        var q = url.parse(req.url, true).query;
        var op = q.op;
        var operations = ["+", "-", "*", "/"];
        var opIndex = 0;
        var txt = "";
        if (op == "plus") {
            opIndex = 0;
            txt = q.x*1 + q.y*1;
        }
        else if (op == "minus") {
            opIndex = 1;
            txt = q.x - q.y;
        }
        else if (op == "times") {
            opIndex = 2;
            txt = q.x * q.y;
        }
        else if (op == "div") {
            opIndex = 3;
            txt = q.x / q.y;
        }
        var expr = q.x + " " + operations[opIndex] + " " + q.y + " = " + txt;
        res.write("             <p>" + "x" + " = " + q.x + "</p>\n")
        res.write("             <p>" + "y" + " = " + q.y + "</p>\n")
        res.write("             <p>" + "op" + " = " + op + "</p>\n")
        res.write("             <p>" + expr + "</p>\n")
        res.write("         </body>\n");
        res.write("     </html>");
        res.end();
    }
    //Loading the form
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