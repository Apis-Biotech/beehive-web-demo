import express from "express";
import path from "path";

import {config} from "./config"
import routes from './routers/web';
import api_routes from './routers/api';

var fs = require('fs');
var http = require('http');
var https = require('https');

const app = express();

app.use(express.json());

// ejs set up
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/static/views'))


// Set static dir for static resources
app.use('/assets', express.static(path.join(__dirname + '/static/assets')))

// set web and api routes
app.use(api_routes)
app.use(routes)

app.use(function(req, res, next) {
    if (!req.path.includes('/hive-stats/')) {
        res.redirect("/hive-stats/test1")
      
    } else {
      next();
    }
});



var http_server: any;
var httpsServer: any;

if (config.ssl_on){
  var privateKey  = fs.readFileSync(config.ssl_key, 'utf8');
  var certificate = fs.readFileSync(config.ssl_cert, 'utf8');

  var credentials = {key: privateKey, cert: certificate};

  // Create https server
  httpsServer = https.createServer(credentials, app);
  httpsServer.listen(config.https_port);

  console.log( `Server started at https://localhost:${config.https_port}`);


  // Creating an http server
  http_server = http.createServer((req:any, res:any) => {
    var host = req.headers.host
    var redirect_url = `https://${host}${req.url}`;
    res.writeHead(301,{Location: redirect_url});
    res.end();
  });

} else {


  http_server = http.createServer(app);
  console.warn("HTTPS is Off. Only HTTP server is running!")


}


// Http webserver start
app.listen(config.http_port, () => {     
    console.log( `Server started at http://localhost:${config.http_port}`);
});