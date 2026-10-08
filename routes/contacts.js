const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', (req, res) => {
  // #swagger.tags = ['Contacts']
  /* #swagger.responses[200] = {
    schema: [{ $ref: '#/definitions/Contact' }]
  } */
  if (req.query.id !== undefined) {
    return contactsController.getSingle(req, res);
  }
  return contactsController.getAll(req, res);
});
router.get('/:id', (req, res) => {
  // #swagger.tags = ['Contacts']
  /* #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Contact' }
  } */
  contactsController.getSingle(req, res);
});
router.post('/', (req, res) => {
  // #swagger.tags = ['Contacts']
  /* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Contact' }
  } */
  contactsController.createContact(req, res);
});
router.put('/:id', (req, res) => {
  // #swagger.tags = ['Contacts']
  /* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Contact' }
  } */
  contactsController.updateContact(req, res);
});
router.delete('/:id', (req, res) => {
  // #swagger.tags = ['Contacts']
  /* #swagger.responses[200] = {
    description: 'Contact deleted',
    schema: { $ref: '#/definitions/Message' }
  } */
  contactsController.deleteContact(req, res);
});

module.exports = router;