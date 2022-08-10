const sendRefreshToken = (response, token) => {

    response.cookie('refreshtoken', token, {

        httpOnly: true,
        path: '/refresh',
        expires: new Date(Date.now() + 432000000)

    });

};

module.exports = sendRefreshToken;
