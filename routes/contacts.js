const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', (req, res) => {
  if (req.query.id !== undefined) {
    return contactsController.getSingle(req, res);
  }
  return contactsController.getAll(req, res);
});
router.get('/:id', contactsController.getSingle);

module.exports = router;