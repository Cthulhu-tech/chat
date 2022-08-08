const sendRefreshToken = (response, token) => {

    response.cookie('refreshtoken', token, {

        httpOnly: true,
        path: '/refresh',

    });

};

module.exports = sendRefreshToken;
