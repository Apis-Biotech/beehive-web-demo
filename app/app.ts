import express from "express";
import path from "path";

const app = express();

// ejs set up
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/static/views'))


// Index Page
app.get('/', function(req, res) {
    res.status(200)
    res.render("index.ejs");
});

// Set static dir for static resources
app.use('/assets', express.static(path.join(__dirname + '/static/assets')))


app.listen(80, () => {     
    console.log( `server started at http://localhost:${80}`);
});