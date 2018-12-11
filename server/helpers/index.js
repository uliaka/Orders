const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = function (token) {
  return new Promise (function (resolve, reject) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        reject ('User not authenticated');
     } else {
         resolve (decoded);
      }
    })
  })
}

module.exports = verifyToken;
