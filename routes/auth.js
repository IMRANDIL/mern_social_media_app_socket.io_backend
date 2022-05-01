const { registerUser, login_auth } = require('../controllers/authController');

const router = require('express').Router();


//auth route...


router.route('/register').post(registerUser)

router.route('/login').post(login_auth)





module.exports = router;