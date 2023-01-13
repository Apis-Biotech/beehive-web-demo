import express from "express";
import path from "path";

import {config} from "./config"
import routes from './routers/web';
import api_routes from './routers/api';

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




// Http webserver start
app.listen(config.http_port, () => {     
    console.log( `server started at http://localhost:${config.http_port}`);
});