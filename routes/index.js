const router = require('express').Router();
const controller = require('../controllers');

router.use('/', require('./swagger'));

router.get('/', controller.homePage);
router.get('/about', controller.aboutPage);
router.get('/products', controller.productsPage);
router.get('/student', controller.studentPage);
router.use('/contacts', require('./contacts'));

module.exports = router;
