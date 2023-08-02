const express = require('express');

const hbs = require('hbs');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials('partials_absolute_path');
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  fetch('https://api.punkapi.com/v2/beers')
    .then(response => response.json())
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (req, res) => {
  fetch('https://api.punkapi.com/v2/beers/random')
    .then(response => response.json())
    .then(random => {
      res.render('randomBeer', { random });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
