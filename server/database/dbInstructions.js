const mongoose = require('mongoose');
const db = require('./index.js')

//Create Client and Provider collections and populate them with dummy documents

const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    providers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider"
    }]
  })
)

const Provider = mongoose.model(
  "Provider",
  new mongoose.Schema({
    name: String,
    clients: [
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client"
    ]
  })
)



