const { updateUser } = require('../controllers/userController');

const router = require('express').Router();




//user route.....

router.route('/:id').put(updateUser).get().delete();










module.exports = router;