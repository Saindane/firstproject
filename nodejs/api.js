var http = require("http");
var  Request = require("request");
var fs = require("fs");

var server = http.createServer(function(res, req){

   //This is fetching the from url
    Request.get("https://jsonplaceholder.typicode.com/posts", (error, response, data) => {


        if(error) {
            return console.log(error);
        }

         //url fetch data store into file
        fs.writeFile('json.txt', data ,  function(err) {
            if (err) {
               return console.error(err);
            }
        })

    });

    req.write("Data fetching is done");

});
server.listen(2000);
