const User = require('../models/User')

const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')




//update a user....controller.....

exports.updateUser = asyncHandler(async (req, res) => {
    //extract the id from the req.params...

    const { id } = req.params;


    if (!id) {
        res.status(400);
        throw new Error('Id required')
    }
    //find the specifc user in the database....

    const isUserExist = await User.findOne({ _id: id }).exec();

    //validate...if user exist or not with this id...

    if (!isUserExist) {
        res.status(400);
        throw new Error(`No such user Exists with this id: ${id}`)
    }


    //now...updating user....

    if (isUserExist || isUserExist.isAdmin) {
        let { password } = req.body;

        if (password) {
            const salt = await bcrypt.genSalt(12);
            password = await bcrypt.hash(password, salt);

        }

        //find the user and update....
        await User.findByIdAndUpdate(id, {
            $set: req.body
        })


        //now send the response....
        res.status(200).json({ msg: `username: ${isUserExist.username} updated!` })


    } else {
        res.status(403);
        throw new Error('You are not authorized!')
    }



})









//delete a user....

// get a user...

//follow a user..

//unfollow a user..