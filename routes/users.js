const { updateUser } = require('../controllers/userController');
const { protectRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();




//user route.....

router.route('/:id').put(protectRoute, updateUser).get().delete();










module.exports = router;