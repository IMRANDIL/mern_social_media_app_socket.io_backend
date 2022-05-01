const User = require('../models/User');

const bcrypt = require('bcrypt');

const asyncHandler = require('express-async-handler');

const jwt = require('jsonwebtoken')



//register controller....







exports.registerUser = asyncHandler(async (req, res) => {
    //no need to try catch now....exception will be  caught now...

    //extract data  from the req.body....

    const { username, email, password } = req.body;


    //then validate it....

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please add the required fields!')
    }


    //now check if user exists...in the database...

    const isUserExist = await User.findOne({ email: email }).exec();

    if (isUserExist) {
        res.status(400);
        throw new Error(('User already Exists!'))
    }


    //now...hash the password...

    const salt = await bcrypt.genSalt(12);

    const hashPass = await bcrypt.hash(password, salt);


    //now create the user......

    const user = await User.create({
        username,
        password: hashPass,
        email
    });


    //validate again...

    if (user) {
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid User data')
    }




});





//login controller...



exports.login_auth = asyncHandler(async (req, res) => {
    //extract data from the req.body....

    const { email, password } = req.body;

    //now validate it....

    if (!email || !password) {
        res.status(400);
        throw new Error('Email and Password required!')
    }


    //now..check for user if user exist or not...in the database...

    const isUserExist = await User.findOne({ email: email }).exec();


    if (!isUserExist) {
        res.status(400);
        throw new Error('User does not exist!')
    }


    //now compare the password...

    const ispassMatch = await bcrypt.compare(password, isUserExist.password);

    if (!ispassMatch) {
        res.status(400);
        throw new Error('Invalid Credentials')
    }


    // now send the response...

    res.status(200).json({
        id: isUserExist._id,
        username: isUserExist.username,
        email: isUserExist.email,
        token: generateToken(isUserExist._id)

    })




});
















//generate jwt token...


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '900s' })
}