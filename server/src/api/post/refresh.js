const sendRefreshToken = require("../../utils/jwt/sendRefresh");
const createRefreshToken = require("../../utils/jwt/refresh");
const createAccessToken = require("../../utils/jwt/access");
const connectDB = require("../../utils/db/connection");
const {verify} = require("jsonwebtoken");

const refresh = async (request, response) => {

    try {
      
      const token = request?.cookies?.refreshtoken;

      if (!!!token) return response.status(401).json({ accesstoken: null });
  
      let payload = null;

      try {

        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);

      } catch (err) {

        if(!!token) await connection.query('DELETE FROM jwt WHERE jwt = ?', [token]);

        return response.status(401).send({ accesstoken: null });
  
      }

      const connection = await connectDB();
  
      const jwt = await connection.query('SELECT * FROM jwt WHERE user_id = ? and jwt = ?', [payload.userId, token]);

      const user = await connection.query('SELECT * FROM user WHERE id = ?', [payload.userId]);

      if (!user[0][0]) return response.send({ accesstoken: null });

      if (jwt[0].length === 0 || jwt[0][0].jwt !== token)
        return response.status(401).json({ accesstoken: null });

      const accesstoken = await createAccessToken(user[0][0].id, "1m");

      const refreshtoken = await createRefreshToken(user[0][0].id, "7d");
  
      await connection.query('DELETE FROM jwt WHERE jwt = ?', [token]);

      await connection.query('INSERT INTO jwt (user_id, jwt) VALUES (?, ?)', [payload.userId, refreshtoken]);

      const user_info = await connection.query('SELECT * FROM user WHERE id = ?', [payload.userId]);

      sendRefreshToken(response, refreshtoken);
      
      connection.end();
        
        response.status(201).json({
            
            login: user_info[0][0].login,
            message: 'token refresh',
            accesstoken,
            auth: true

        });
  
    } catch (error) {
      
      console.log(error);
  
      response.status(500).json({ error: 'unknown error' });
  
    }
  
}

module.exports = refresh;
