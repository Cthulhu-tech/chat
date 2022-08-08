const sendRefreshToken = require("../utils/jwt/sendRefresh");
const sendAccessToken = require("../utils/jwt/sendAccess");
const createRefreshToken = require("../utils/jwt/refresh");
const createAccessToken = require("../utils/jwt/access");
const connectDB = require("../utils/db/connection");
const {compare} = require("bcrypt");

const login = async (req, res) => {

    try{

        const { login, password } = req.body;

        if(login === undefined || password === undefined || login.length > 54 || password.length > 255 || login.length === 0 || password.length === 0) res.status(403).end({"message": "Invalid login or password"});

        const connection = await connectDB();

        const user = await connection.query('SELECT * FROM user WHERE login = ?', [login]);

        if(user[0].length > 0){

            const valid = await compare(password, user[0][0].password);

            if(!valid){

                connection.end();

                res.status(403).json({error: 'Invalid login or password'});
        
                return;

            }

            const accesstoken = await createAccessToken(+user[0][0].id, '15m');
            const refreshtoken = await createRefreshToken(+user[0][0].id, '7d');

            await connection.query('UPDATE user SET jwt = ? WHERE login = ?', [refreshtoken, login]);

            await connection.end();

            await sendRefreshToken(res, refreshtoken);
            await sendAccessToken(res, accesstoken, user[0][0]);
            

        }else{

            connection.end();

            res.status(403).json({error: "Invalid login or password"});

            return;

        }
    
    }catch(error){
        
        console.log(error);

        res.status(500).json({error: "server error"});

        return;

    }

}

module.exports = login;
