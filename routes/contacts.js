const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', (req, res) => {
  if (req.query.id !== undefined) {
    return contactsController.getSingle(req, res);
  }
  return contactsController.getAll(req, res);
});
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;