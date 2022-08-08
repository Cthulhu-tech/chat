const {sign} = require("jsonwebtoken");

const createRefreshToken = (userId, time) => {
    
    return sign({ userId }, (process.env.REFRESH_TOKEN_SECRET), {
  
      expiresIn: time,
  
    });
}

module.exports = createRefreshToken;
