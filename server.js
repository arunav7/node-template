const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;

var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear' , () => {
    return new Date().toISOString();
});

app.use((req,res,next) => {
    next();
});

app.get('/',(req,res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome Page',
        pageTitle: 'Home'
    });
});

app.get('/details',(req,res) => {

    var stats = {
        Edition: 'Windows 10 Home Single Language',
        Version: '1803',
        Arch: 'x64-86'
    }

    fs.writeFile('stats.json', JSON.stringify(stats), (err) => {
        if(err) {
            console.log(err);
        }

        fs.readFile('stats.json', (err,data) => {
            res.send(JSON.parse(data));
        });
    });

    // res.render('details.hbs', {
    //     welcomeMessage: 'File Contents are.....',
    //     pageTitle: 'Details'
    // });
});

app.listen(port, () => {
    console.log(`Server is up on ${port}`)
});