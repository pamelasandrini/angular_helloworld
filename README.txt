#Angular users app

Angular and Node app that connects to Cloundant DB in Bluemix

To run the application go to starter-app folder
Run Node server as: node server.js
Run Angular app as: ng build --watch

The main URL to access the project is:
http://localhost:3000/

You can also acces the URLs below:

http://localhost:3000/#/propertybind
http://localhost:3000/#/twowaybind
http://localhost:3000/#/eventbind


**********************
This project is integrated with IBM Cloudant DB, the cloudant credentials can be found on the .env file as described below:

# Cloudant Credentials
cloudantNoSQLDB_credentials_username=xxxxx
cloudantNoSQLDB_credentials_password=xxxxx
cloudantNoSQLDB_credentials_host=xxxxx
cloudantNoSQLDB_credentials_port=xxx
cloudantNoSQLDB_credentials_url=xxxxx

If you're not familiar with IBM Cloud and Cloudant, please take a look on the link below: 

https://console.bluemix.net/docs/services/Cloudant/getting-started.html#getting-started-with-cloudant