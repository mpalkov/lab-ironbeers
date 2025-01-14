const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, "views/partials"));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      console.log("BEERS FROM API: ", beersFromApi)
      return beersFromApi;
    })
    .then((beersFromApi) => {
      console.log(beersFromApi);
      res.render("beers", { beersFromApi, title: "Beers"});
    })
    .catch((error) => console.log("ERROR: ", error))
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(response => response[0])
  .then(randomBeer => {
    res.render('random-beer', { randomBeer, title: "Random-Beer" })
  })
});

app.get('/', (req, res) => {
  res.render('index', {title: "Ironbeers"});
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
