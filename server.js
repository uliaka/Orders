const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const flash = require('connect-flash');

const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const session = require('express-session')

mongoose.connect('mongodb://localhost:27017/test');

const Order = require('./server/models/order');
const User = require('./server/models/user');

const db = mongoose.connection;
db.on('error', function(err) {
  console.log(err)
});
db.once('open', function() {

});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash())


app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(
  function(username, password, done) {
    try {
      User.findOne({ username }).exec((err, data) => {
        if (data) {
          return done(null, data);
        } else {
          return done(null, false);
        }
      })
    } catch(err) {
      
    }
  }
));

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
//  res.end();
});

app.post('/orders',  function (req, res) {
  const newOrder = new Order({ title: req.body.title, price: req.body.price });
  newOrder.save();
  res.sendFile(__dirname + '/index.html');
  res.end();
});

app.get('/orders', function (req, res) {
  const orders = Order.find({}).then(function (data) {
    res.send({data:data});
    res.end();
  });
});



app.get('/login', function (req, res) {
  const orders = Order.find({}).then(function (data) {
    res.send({data: 'login page'});
    res.end();
  });
});

const passportConfig = { session: false,  successRedirect: '/', failureRedirect: '/login' };

app.post('/login', passport.authenticate('local', passportConfig), function (req, res) {
  console.log('login handler function')
  res.json({opa: 5})

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
