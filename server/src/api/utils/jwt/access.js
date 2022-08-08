const {sign}  = require('jsonwebtoken');

const createAccessToken = (userId, time) => {

    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {

      expiresIn: time,

    });
}

module.exports = createAccessToken;
