const User = require('../models/User');

const bcrypt = require('bcrypt');

const asyncHandler = require('express-async-handler')


exports.registerUser = asyncHandler(async (req, res) => {
    //no need to try catch now....exception will be  caught now...

    //extract data  from the req.body....

    const { } = req.body;

    //then validate it....

})