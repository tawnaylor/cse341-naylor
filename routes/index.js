const router = require('express').Router();
const controller = require('../controllers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', controller.homePage);
router.get('/about', controller.aboutPage);
router.get('/products', controller.productsPage);
router.get('/student', controller.studentPage);
router.use('/contacts', require('./contacts'));

module.exports = router;
