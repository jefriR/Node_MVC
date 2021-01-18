const router = require('express').Router();
const postController = require('../controllers/postController');

router.get('/', postController.getData);
router.post('/', postController.postData);

module.exports = router;