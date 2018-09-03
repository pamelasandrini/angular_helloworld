'use strict';

const express = require('express');

const controller = require('./user.controller');

module.exports = (middlewares) => {
  const router = express.Router();

  if (middlewares) {
    middlewares.forEach(middleware => router.use(middleware));
  }

  // Get all Users 
  router.get('/', controller.getUsers);

  // Get all Users deleted
  router.get('/deleted/:vendorid', controller.getUsersDeleted);

  // Get User by id
  router.get('/id/:id', controller.getUserById);

  // Get User by role
  router.get('/vendor/:vendorid/role/:role', controller.getUsersByRole);

  // Get Users by IBM ID
  router.get('/ibmid/:ibmId', controller.getUsersByIbmId);

  // Insert User
  router.post('/', controller.insertUser);

  // Update User by id
  router.post('/id/:id', controller.updateUser);

  // Delete User by id
  router.delete('/id/:id', controller.deleteUser);

  return router;
};