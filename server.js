const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const flash = require('connect-flash');

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session')
const md5 = require('md5');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/test');
// models
const Order = require('./server/models/order');
const User = require('./server/models/user');
const Category = require('./server/models/category')
const Product = require('./server/models/product')
//orders
const ordersRouter = require('./server/routers/orders');
const categoriesRouter = require('./server/routers/categories')
const productsRouter = require('./server/routers/products')

const verifyToken = require('./server/helpers/index')

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


app.use('/orders', ordersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

passport.use(new Strategy(
  function(username, password, done) {
    try {
      User.findOne({ username }).exec((err, data) => {
        const hashPassword = md5(password);
        const user = data;
        if (!err && hashPassword == user.password){
          const secret = 'secret';
          const token = jwt.sign(username, secret);
          console.log('token',token)
          const dataWithToken = Object.assign({ token }, { username });
          return done(null, dataWithToken);
        } else {
          return done(null, false);
        }
      })
    } catch(err) {
      console.log(err)
    }
  }
));


const authMiddleware = function(req, res, next) {
  const token = req.body.token;
  if (token) {
    verifyToken(token)
      .then(function(decoded) {
        User.findOne({ username: decoded }).exec((err, data) => {
          if (data) {
            next();
          } else {
            res.send(err)
          }
        })
      })
    .catch(function(err) {
        res.send(err)
    })
  } else {
    res.json({ message: 'Token not provided' })
  }
}


app.get('/', function (req, res) {
  res.sendFile('public/index.html');
//  res.end();
});

const passportConfig = { session: false };

app.post('/login', passport.authenticate('local', passportConfig), function (req, res) {
  res.json({user: req.user});
});

app.get('/users', authMiddleware, function (req, res) {
  const users = User.find({}).then(function (data) {
    res.send({data:data});
    res.end();
  });
});


app.post('/register', function(req, res) {
  const { username, password } = req.body;
  User.find({ username }, function (err, docs) {
    if (!docs.length) {
      var newUser = new User({ username, password: md5(password) });
      newUser.save(function (err) {
        if (err) {
          return res.json({ message: 'That username already exists.' });
        }
        res.json({ message: 'Successfully created new user.' });
      });
    } else {
      return res.json({ message: 'That username already exists.' });
    }
  });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
