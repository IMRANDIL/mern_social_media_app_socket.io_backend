const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler')

const User = require('../models/User');




exports.protectRoute = asyncHandler(async (req, res, next) => {

    //store token...
    let token;



    //now validate the header and extract ....

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            //get token from headers...

            token = req.headers.authorization.split(' ')[1];

            //verify token now....

            const decoded = jwt.verify(token, process.env.JWT_SECRET);



            //get user from the token...

            req.user = await User.findById(decoded.id).select('-password');

            next()



        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized')
        }
    }



    if (!token) {
        res.status(401);
        throw new Error('Not authorized, not token')
    }





})