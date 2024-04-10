const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];    // Authorization: 'Bearer ' + token
        if(!token){
            throw new Error('Authentication failed!');
        }

        // Validating token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);       // this has userId and email, so can verify now
        req.userData = {userId: decodedToken.userId};                           // adding data to request
        next();

    } catch (err) {
        const error = new HttpError('Authentication failed', 401);
        return next(error);
    }
};