const mongoose = require('mongoose');
const yourDB = 'Clients';
const mongoURI = `mongodb://localhost/${yourDB}`;

const db = mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Connection error ', err))

module.exports = db;