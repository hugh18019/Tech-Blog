const path = require('path'); //guide express.static to public folder
const express = require('express'); //express server
const session = require('express-session'); //import express-sessions
const routes = require('./controllers');
const exphbs = require('express-handlebars'); //import express-handlebars
// import sequelize connection
const sequelize = require('./config/connection'); //import connection to db
const SequelizeStore = require('connect-session-sequelize')(session.Store); //storing sessions

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 1000 * 60 * 10 }, //cookie timer is 10 minutes (60000 ms)
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

// const path = require('path');
// const express = require('express');
// const exphbs = require('express-handlebars');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const sequelize = require('./config/connection');

// const hbs = exphbs.create({});

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./controllers/'));

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });
