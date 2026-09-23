const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.homePage);
router.get('/about', controller.aboutPage);
router.get('/products', controller.productsPage);
router.get('/student', controller.studentPage);

module.exports = router;
