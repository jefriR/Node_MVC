const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/login', userController.viewLogin);
router.post('/login', userController.postLogin);
router.get('/register', userController.viewRegister);
router.post('/register', userController.postRegister);

module.exports = router;