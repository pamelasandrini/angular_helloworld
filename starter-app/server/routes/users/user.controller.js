'use strict';

const model = require('./user.model');

/**
 * Get all Users.
 * Send the array of Users or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const getUsers = (req, res) => {
  model.getAllUsers()
    .then(data => res.send(data))
    .catch(err => res.send(err));
};

/**
 * Get all Users Deleted
 * Send the array of Users or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const getUsersDeleted = (req, res) => {
  model.getAllDeleted(req.params.vendorid)
    .then(data => res.send(data))
    .catch(err => res.send(err));
};

/**
 * Get User by id.
 * Send the User or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const getUserById = (req, res) => {
  model.getById(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.send(err));
};

/**
 * Get Users by IBM ID.
 * Send the array of Users or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const getUsersByIbmId = (req, res) => {
  model.getByIbmId(req.params.ibmId.toLowerCase())
    .then(data => res.send(data))
    .catch(err => res.send(err));
};

/**
 * Insert a new User.
 * Send the operation result or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const insertUser = (req, res) => {
  console.log(req.body);
  
  model.insert(req.body)
    .then(data => {
      console.log('User inserted!!')
       res.send(data)
    })
    .catch(err => res.send(err));
};

/**
 * Update an existing User.
 * Send the operation result or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const updateUser = (req, res) => {
  model.update(req.params.id, req.body)
    .then(data => {
        console.log('User Updated!!')
        .then(() => res.send(data))
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
};

/**
 * Save a User (insert a new one or update an existing one).
 * Send the operation result or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const saveUser = (req, res) => {
  model.save(req.body)
    .then(data => res.send(data))
    .catch(err => res.send(err));
};

/**
 * Delete a User by id.
 * Send the operation result or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const deleteUser = (req, res) => {
  model.remove(req.params.id)
    .then(data => {
      console.log('User Deleted!')

        .then(() => res.send(data))
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
};


/**
 * Search Users by role.
 * Send the operation result or failure to the HTTP response.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 */
const getUsersByRole = (req, res) => {
  model.getByRole(req.params.role, req.params.vendorid)
    .then(data => res.send(data))
    .catch(err => res.send(err));
};


module.exports = {
  getUsers,
  getUserById,
  getUsersByIbmId,
  insertUser,
  updateUser,
  saveUser,
  deleteUser,
  getUsersByRole,
  getUsersDeleted,
};