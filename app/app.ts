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
app.use(routes)
app.use(api_routes)


// Http webserver start
app.listen(config.http_port, () => {     
    console.log( `server started at http://localhost:${config.http_port}`);
});