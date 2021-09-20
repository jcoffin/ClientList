const mongoose = require('mongoose');
const db = require('./index.js')

//Create Client Schema

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  email: String,
  phone: Number,
  providers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider"
  }]
});

//Create Client Model

const Client = mongoose.model("Client", clientSchema);

//Create Provider Schema

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});

//Create Provder Model

const Provider = mongoose.model("Provider", providerSchema);

module.exports = {
  Client,
  Provider
}


