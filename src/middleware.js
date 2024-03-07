const APIError = require('./apiError/ApiError');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require("./config");

const mainErrorHandler = (errorGot, req, res, next) => {

    // patikrinti ar atkeliaves error yra instance APIError
    if (errorGot instanceof APIError) {
        return res.status(errorGot.status).json({
            error: errorGot.message,
        });
    }

    res.status(500).json({
        error: 'Internal system error',
    });
};

const validateJWTToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({error: 'Access denied'});

    if (!jwtSecret) return res.status(401).json({error: 'JWT Secret not Provided'});

    try {
        jwt.verify(token, jwtSecret);
        next();
    } catch (error) {
        return next(new APIError('Invalid token', 401));
    }
};

module.exports = {
    mainErrorHandler,
    validateJWTToken
};
