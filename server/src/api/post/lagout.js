const connectDB = require("../../utils/db/connection");

const lagout = async (request, response) => {

    try{

        const token = request?.cookies?.refreshtoken;

        if(!!token){
    
            const connection = await connectDB();
    
            await connection.query('DELETE FROM jwt WHERE jwt = ?', [token]);

            await connection.end();

            response.clearCookie('refreshtoken', { path: '/' });
    
            response.status(200).json({message: 'lagout'});
        
        }

    }catch(err){

        response.status(500).json({message: 'lagout'});

    }

}

module.exports = lagout;
