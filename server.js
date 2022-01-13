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

const hbs = exphbs.create({
  // layoutsDir: path.join(__dirname, 'views/layouts'),
  // // partialsDir: path.join(__dirname, 'views/partials'),
  // defaultLayout: 'layout',
  // extname: 'hbs',
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// Add the option alter: true to track changes in the models
sequelize.sync({ force: false, alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
