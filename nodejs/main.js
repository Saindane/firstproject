//console.log("Hello World");
//This is for http module includes classes, methods and events to create Node.js http server.
/*
var http = require("http");

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8082);

// Console will print the message
console.log('Server running at http://127.0.0.1:8082/');*/

//------------------------------------------------------------------

//This fs modules for doing file realted data
//This example is for file reading in blocking mode
/*
var fs = require("fs");

var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("Program Ended");*/

//------------------------------------------------------------------
//This example is for file reading in nonblocking mode
var fs = require("fs");

fs.readFile('input.txt', 'utf8',function (err, data) {
   if (err) return console.error(err);
   debugger;
   console.log(data.toString());
});

console.log("Program Ended");