const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const contacts = await mongodb.getDb().collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  const id = req.params.id ?? req.query.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact id' });
  }
  try {
    const contact = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

const getMissingFields = (body = {}) => requiredFields.filter((field) => !body[field]);

const buildContact = (body) => ({
  firstName: body.firstName,
  lastName: body.lastName,
  email: body.email,
  favoriteColor: body.favoriteColor,
  birthday: body.birthday
});

const createContact = async (req, res) => {
  // #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/ContactInput' } }
  const missing = getMissingFields(req.body);
  if (missing.length) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  }

  try {
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(buildContact(req.body));
    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error creating contact' });
  }
};

const updateContact = async (req, res) => {
  // #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/ContactInput' } }
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid contact id' });
  }

  const missing = getMissingFields(req.body);
  if (missing.length) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  }

  try {
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: new ObjectId(req.params.id) }, buildContact(req.body));

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error updating contact' });
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid contact id' });
  }

  try {
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error deleting contact' });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };