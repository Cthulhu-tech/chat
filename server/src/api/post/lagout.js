const lagout = (req, res) => {

    res.clearCookie('refreshtoken', { path: '/refresh' });

    return res.status(200).json({message: 'lagout'});

}

module.exports = lagout;
