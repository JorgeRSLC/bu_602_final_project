// Importing required modules
// Importing Mongoose library for MongoDB interactions
const mongoose = require('mongoose'); 
// Importing credentials module to get connection details
const creds = require("./credentials.js"); 

// Constructing the MongoDB connection URL using the credentials
const dbUrl = creds.protocol + creds.user + ':' + creds.password +
			'@' + creds.cluster + '/' + creds.database + creds.queryParam;
// initialize database connection
mongoose.connect(dbUrl)
const db = mongoose.connection
db.on('error', err => {
  console.error('MongoDB error: ' + err.message)
  process.exit(1)
})
db.once('open', () => console.log('MongoDB connection established'))
