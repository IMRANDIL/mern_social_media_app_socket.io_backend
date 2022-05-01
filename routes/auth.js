const { registerUser } = require('../controllers/authController');

const router = require('express').Router();


//auth route...


router.route('/register').post(registerUser)

router.route('/login').post()





module.exports = router;