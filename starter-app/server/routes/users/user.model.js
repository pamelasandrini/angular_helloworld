'use strict';

const db = require('../../dao/cloudant');
const dbName = 'usersdb';


/**
 * Get a User document, based on the document id.
 * @param {string} id - The User id.
 * @returns {Promise} - The Promise object representing the document found or failure.
 */
const getById = id => db.get(dbName, id);

/**
 * Get User documents, based on the view byIbmId, for a specific IBM ID.
 * @param {string} email - The User email.
 * @returns {Promise} - The Promise object representing an array of the documents found or failure.
 */
const getByEmail = email => db.view(dbName, 'users', 'byEmail', {
  key: email
});

/**
 * Get User documents, based on the view byDocType User.
 * @returns {Promise} - The Promise object representing an array of the documents found or failure.
 */
const getAllUsers = docType => db.view(dbName, 'users', 'byDocType', {
});


/**
 * Insert a new User document.
 * @param {Object} doc - The User document to be inserted.
 * @returns {Promise} - The Promise object representing the document saving or failure.
 */
const insert = doc =>
  new Promise((resolve, reject) => {
    // If the document does not have the "docType": "User" element, include it
    if (!doc.docType) {
      doc.docType = 'User'; // eslint-disable-line no-param-reassign
    }
    db.insert(dbName, doc)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

/**
 * Update an existing User document.
 * @param {string} id - The User document id.
 * @param {Object} doc - The User document to be updated.
 * @returns {Promise} - The Promise object representing the document saving or failure.
 */
const update = (id, doc) =>
  new Promise((resolve, reject) => {
    // If the document does not have the "docType": "User" element, include it
    if (!doc.docType) {
      doc.docType = 'User'; // eslint-disable-line no-param-reassign
    }

    db.update(dbName, id, doc)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

/**
 * Save a User document (insert a new one or update an existing one).
 * @param {Object} doc - The User document to be saved.
 * @returns {Promise} - The Promise object representing the document saving or failure.
 */
const save = doc =>
  new Promise((resolve, reject) => {
    // If the document does not have the "docType": "User" element, include it
    if (!doc.docType) {
      doc.docType = 'User'; // eslint-disable-line no-param-reassign
    }

    db.save(dbName, doc)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

/**
 * Delete a User document, based on the document id.
 * @param {string} id - The User id.
 * @returns {Promise} - The Promise object representing the document deletion or failure.
 */
const remove = id => db.remove(dbName, id);


module.exports = {
  getAllUsers,
  getById,
  getByEmail,
  insert,
  update,
  save,
  remove
};