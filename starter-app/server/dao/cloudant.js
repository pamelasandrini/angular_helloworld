'use strict';

require('dotenv').config();



const cloudant = require('cloudant');

/**
 * Connect to a CloudantDB, based on VCAP_SERVICES from a remote hosting or from local configs.
 * @returns {Promise} - The Promise object representing the CloudantDB connection or failure.
 */
function connect() {
  var VCAP_SERVICES;

  // Re-enable this code once Cloudant service is added to Bluemix apps
  if (process.env.VCAP_SERVICES) {
    VCAP_SERVICES = process.env.VCAP_SERVICES;
  } else {
    VCAP_SERVICES = {
      'cloudantNoSQLDB': [{
        'credentials': {
          'username':  process.env.cloudantNoSQLDB_credentials_username,
          'password': process.env.cloudantNoSQLDB_credentials_password,
          'host': process.env.cloudantNoSQLDB_credentials_host,
          'port': process.env.cloudantNoSQLDB_credentials_port,
          'url': process.env.cloudantNoSQLDB_credentials_url
        }
      }]
    }
  }


  VCAP_SERVICES = (typeof VCAP_SERVICES === 'string') ? JSON.parse(VCAP_SERVICES) : VCAP_SERVICES;
  return cloudant({
    vcapServices: VCAP_SERVICES,
    plugin: 'promises'
  });
}

/**
 * Create a new database, it not existing.
 * @param {string} dbName - The database name.
 * @returns {Promise} - The Promise object representing the database creation or failure.
 */
const createDb = dbName =>
  new Promise(() => {
    connect().db.create(dbName)
      .then(() => console.log(`Database ${dbName} created`))
      .catch(err => {
        if (err.statusCode === 412) {
          console.log(`Database ${dbName} not created, because it already exists`);
        } else {
          console.log(err);
        }
      });
  });

/**
 * Get information about a database.
 * @param {string} dbName - The database name.
 * @returns {Promise} - The Promise object representing the database information or failure.
 */
const getDb = dbName => connect().db.get(dbName);

/**
 * Set a database to be used.
 * @param {string} dbName - The database name.
 * @returns {Promise} - The Promise object representing the database ready for usage or failure.
 */
const useDb = dbName => connect().db.use(dbName);

/**
 * List documents of a database.
 * @param {string} dbName - The database name.
 * @returns {Promise} - The Promise object representing an array of the database documents or failure.
 */
const list = dbName =>
  new Promise((resolve, reject) => {
    useDb(dbName).list({
        include_docs: true
      })
      .then(data => {
        const docs = [];
        if (data.rows) {
          data.rows.forEach(row => {
            if (row.doc) {
              docs.push(row.doc);
            }
          });
          resolve(docs);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

/**
 * Find documents in a database, based on a selector object.
 * @param {string} dbName - The database name.
 * @param {Object} selector - The selector object with the criteria to find documents.
 * @returns {Promise} - The Promise object representing an array of the documents found or failure.
 */
const find = (dbName, selector) =>
  new Promise((resolve, reject) => {
    useDb(dbName).find({
        'selector': selector
      })
      .then(data => {
        resolve(data.docs);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

/**
 * Get documents from database view.
 * @param {string} dbName - The database name.
 * @param {string} designDoc - The design doc name, which contains the view.
 * @param {string} view - The view name.
 * @param {Object} params - The object with the params to query the view.
 * @returns {Promise} - The Promise object representing an array of the documents found or failure.
 */
const view = (dbName, designDoc, viewName, params = null) =>
  new Promise((resolve, reject) => {
    // Create params object, if null, and include the "include_docs": true param
    if (!params) {
      params = {}; // eslint-disable-line no-param-reassign
    }
    params.include_docs = true; // eslint-disable-line no-param-reassign

    useDb(dbName).view(designDoc, viewName, params)
      .then(data => {
        const docs = [];
        if (data.rows) {
          data.rows.forEach(row => {
            if (row.doc) {
              docs.push(row.doc);
            }
          });
          resolve(docs);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

/**
 * Get a document from the database, based on the document id.
 * @param {string} dbName - The database name.
 * @param {string} id - The document id.
 * @returns {Promise} - The Promise object representing the document found or failure.
 */
const get = (dbName, id) =>
  new Promise((resolve, reject) => {
    useDb(dbName).get(id)
      .then(data => resolve(data))
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

/**
 * Insert a new document into the database.
 * @param {string} dbName - The database name.
 * @param {Object} doc - The document to be inserted. If _id is provided and not existing, new document
 * is inserted with that; otherwise, 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
function insertDoc(dbName, doc) {
  return new Promise((resolve, reject) => {
    // Delete _rev element, if existing, as it is not used to insert new documents
    if (doc._rev) {
      delete doc._rev; // eslint-disable-line no-param-reassign
    }

    console.log('Attempt to insert doc: '.concat(JSON.stringify(doc)));
    useDb(dbName).insert(doc)
      .then(data => {
        console.log('Doc inserted: '.concat(JSON.stringify(data)));
        resolve(data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * Update an existing document in the database.
 * @param {string} dbName - The database name.
 * @param {Object} doc - The document to be updated. Element _id should be provided, otherwise it is an insert.
 * Element _rev should be provided ,otherwise 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
function updateDoc(dbName, id, doc) {
  return new Promise((resolve, reject) => {
    console.log('Attempt to update doc with _id: '.concat(id));
    useDb(dbName).get(id)
      .then(existingDoc => {
        console.log('Existing doc: '.concat(JSON.stringify(existingDoc)));
        doc._id = id;
        doc._rev = existingDoc._rev;
        lconsole.log('New doc: '.concat(JSON.stringify(doc)));
        useDb(dbName).insert(doc)
          .then(data => {
            console.log('Doc updated: '.concat(JSON.stringify(data)));
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * Insert a new document into the database.
 * @param {string} dbName - The database name.
 * @param {Object} doc - The document to be inserted. If _id is provided and not existing, new document
 * is inserted with that; otherwise, 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const insert = (dbName, doc) => insertDoc(dbName, doc);

/**
 * Update an existing document in the database.
 * @param {string} dbName - The database name.
 * @param {Object} doc - The document to be updated. Element _id should be provided, otherwise it is an insert.
 * Element _rev should be provided ,otherwise 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
//const update = (dbName, doc) => updateDoc(dbName, doc);
const update = (dbName, id, doc) => updateDoc(dbName, id, doc);

/**
 * Save a document in the database.
 * If _id is not provided, insert a new document.
 * If _id is provided and does not exist, insert a new document.
 * If _id is provided and exists, update an existing document.
 * @param {string} dbName - The database name.
 * @param {Object} doc - The document to be saved.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const save = (dbName, doc) =>
  new Promise((resolve, reject) => {
    // If the doc to be saved has _id, check if a doc with the _id exists
    if (doc._id) {
      useDb(dbName).get(doc._id)
        // If a doc with the _id exists, update it
        .then(() => resolve(updateDoc(dbName, doc._id, doc)))

        .catch(err => {
          // If a doc with the _id does not exist, insert as a new doc
          if (err.statusCode === 404) {
            resolve(insertDoc(dbName, doc));
          } else {
            console.log(err);
            reject(err);
          }
        });
    }
    // If doc to be inserted does not have _id, insert as a new doc
    else {
      resolve(insertDoc(dbName, doc));
    }
  });

/**
 * Delete a document from the database.
 * @param {string} dbName - The database name.
 * @param {string} id - The document id.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const remove = (dbName, id) =>
  new Promise((resolve, reject) => {
    console.log('Attempt to delete doc with _id: '.concat(id));
    useDb(dbName).get(id)
      .then(doc => {
        console.log('Doc to be deleted: '.concat(JSON.stringify(doc)));
        useDb(dbName).destroy(id, doc._rev)
          .then(data => {
            console.log('Doc deleted: '.concat(JSON.stringify(data)));
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

module.exports = {
  createDb,
  getDb,
  useDb,
  list,
  find,
  view,
  get,
  insert,
  update,
  save,
  remove,
};