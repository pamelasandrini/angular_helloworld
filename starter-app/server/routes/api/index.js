'use strict';

const express = require('express');

const controller = require('./api.controller');

module.exports = (middlewares) => {
  const router = express.Router();

  if (middlewares) {
    middlewares.forEach(middleware => router.use(middleware));
  }

  // Get all Accounts
  router.get('/', controller.testApi);
  return router;
};