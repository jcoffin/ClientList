const mongoose = require('mongoose');
const db = require('./index.js')

//Create Client and Provider collections and populate them with dummy documents

const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
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
  })
)

const Provider = mongoose.model(
  "Provider",
  new mongoose.Schema({
    name: {
      type: String,
      unique: true
    },
    clients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client"
    }]
  })
)

//save some dummy data

let clients = [
  {
    name: "Test",
    email: "test@krfs.com",
    phone: 3055550000,
    providers: []
  },
  {
    name: "Test1",
    email: "test1@krfs.com",
    phone: 3050005555,
    providers: []
  },
  {
    name: "Test2",
    email: "test2@krfs.com",
    phone: 3053335555,
    providers: []
  }
]

let providers = [
  {
    name: "Provider1",
    clients: []
  },
  {
    name: "Provider2",
    clients: []
  },
  {
    name: "Provider3",
    clients: []
  },
  {
    name: "Provider4",
    clients: []
  },
  {
    name: "Provider5",
    clients: []
  },
]

Client.insertMany(clients)
.then(doc => console.log(`${doc} has been added`))
.catch(err => console.log('Did not insert clients', err))

Provider.insertMany(providers)
.then(doc => console.log(`${doc} has been added`))
.catch(err => console.log('Did not insert providers', err))


module.export = {
  Client,
  Provider
}


