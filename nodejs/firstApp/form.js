var http = require("http");
var fs = require("fs");



var server = http.createServer(function(req, res){
    //This is GET Method First Time it will Display form
    if(req.method === "GET")
    {
       res.writeHead(200,{"Content-Type":"text/html"});
       fs.createReadStream("./form.html","UTF-8").pipe(res);
    //This is POST Method    
    }else if(req.method === "POST"){
    //We will accept data in the form of chunk
        var data= "";
        req.on("data",function(chunk){
            data+=chunk;
        });

        req.on("end",function(){
           //Store data in file
            fs.writeFile('output.txt', data ,  function(err) {
                if (err) {
                   return console.error(err);
                }
            })

        });

      
    }

});
server.listen(3000);