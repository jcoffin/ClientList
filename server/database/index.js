const mongoose = require('mongoose');
const yourDB = 'yourDatabaseName';
const mongoURI = `mongodb://localhost/${yourDB}`;

const db = mongoose.connect(mongoURI, (err, success) => {

  if (err) {
    console.log(err)
  } else {
    console.log('Connected to MongoDB')
  }

})

module.exports = db;