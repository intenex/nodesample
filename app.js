var http = require('http');
var express = require('express');
var app = express.createServer();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
        res.sendfile('index.html', {layout:false});

    });

app.post('/', function(req, res){
    
    console.log('post received');
    console.log(req.param('query', null));

    var query = req.param('query', null);
    var url_string = 'http://localhost:9200/products/_search?q='+escape(query)+'&pretty=true';

var twitter_client = http.createClient(9200, "localhost");  
  
    var request = twitter_client.request("GET", "/products/_search?q="+escape(query), {"host": "localhost"});  
  
    request.addListener("response", function(response) {  
        var body = "";  
        response.addListener("data", function(data) {  
            body += data;  
        });  
  
        response.addListener("end", function() { 
            console.log(body);
        });  
    });  

    request.close();



    /*var options = {
        host: 'localhost',
        port: 9000,
        path: '/products/_search?q='+escape(query)+'&pretty=true'
    };*/

/*    var options = { host: url_string };

    console.log(options)

    http.get(options, function(http_res) {
        var data= "";

        http_res.on('data', function (chunk) {
            data += chunk;
        });

        http_res.on("end", function() {
            console.log(data);
        });
    });*/

    /*request.on('response', function (res) {
        res.on('data', function (chunk) {
            console.log(chunk);
        });
    });*/


    console.log(url_string);
});


app.listen(process.env.VCAP_APP_PORT || 3000);