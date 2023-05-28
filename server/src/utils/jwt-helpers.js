const jwt = require('jsonwebtoken');


function jwtTokens({ email }) {
    const user = { email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    return ({ accessToken, refreshToken });
}

module.exports = {
    jwtTokens
};
