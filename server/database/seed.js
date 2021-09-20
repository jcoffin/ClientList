const { Client, Provider } = require('./dbModels.js'); //these are the mongoDB models
const {client, provider } = require('../models/index.js'); //these are the query models
const db = require('./index.js');


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

let seed = async function () {

  await Client.insertMany(clients)
  .then(doc => console.log(`${doc} has been added`))
  .catch(err => console.log('Did not insert clients', err))

  await Provider.insertMany(providers)
  .then(doc => console.log(`${doc} has been added`))
  .catch(err => console.log('Did not insert providers', err))


  let allProviders = await Provider.find({})
  .lean()
  .then(docs => docs)
  .catch(err => console.log('Something went wrong', err))

  let addProviders = async function () {
    let testProviders = ['Provider1', 'Provider3', 'Provider5'];
    let test1Providers = ['Provider3'];
    let test2Providers = ['Provider2', 'Provider4']

    for (i = 0; i < allProviders.length; i++) {
      if (testProviders.includes(allProviders[i].name)) {
        await client.addProviderToClientUsingName('Test', allProviders[i]._id)
      }
      if (test1Providers.includes(allProviders[i].name)) {
        await client.addProviderToClientUsingName('Test1', allProviders[i]._id)
      }
      if (test2Providers.includes(allProviders[i].name)) {
        await client.addProviderToClientUsingName('Test2', allProviders[i]._id)
      }
    }
  }
  addProviders()

}

seed()
