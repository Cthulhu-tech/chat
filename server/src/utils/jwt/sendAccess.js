const sendAccessToken = (response, accesstoken, user) => {

    response.status(201).send({
        
        login: user.login,
        message: 'you have successfully logged in',
        accesstoken,
        auth: true

    });

};

module.exports = sendAccessToken;
