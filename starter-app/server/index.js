'use strict';

const fs = require('fs');
const startApp = app => {
    // If remote Bluemix environment
    const http = require('http');
    const server = http.createServer(app);
    const port = 3000;
    server.listen(port, () => {
        console.log('Local HTTP Express server started on http://localhost:' + port);
    });
};

const configureApp = app => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const path = require('path');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false})); 

    console.log(path.join(__dirname, '../dist'));
    
    // Angular DIST output folder
    app.use(express.static(path.join(__dirname, '../dist/starter-app'))); 
    //app.use(express.static(path.join(__dirname, '../dist/starter-app', 'index.html'))); 
}

const initRoutes = (app) => {
    const testApi = require('./routes/api');
    const users = require('./routes/users');

    app.use('/api', testApi());
    app.use('/users', users());
    
}


const createDatabases = () => {
    const cloudant = require('./dao/cloudant');
    const databases = ['usersdb'];
    databases.forEach(db => {
      cloudant.createDb(db);
    });
  };

const init = app => {
    configureApp(app);
    initRoutes(app);
    createDatabases();
    startApp(app);
};

module.exports = init;