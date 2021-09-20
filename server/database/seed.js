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

  console.log('moving on to add Providers', allProviders)

  let addProviders = async function () {
    let testProviders = ['Provider1', 'Provider3', 'Provider4']

    for (i = 0; i < allProviders.length; i++) {
      if (testProviders.includes(allProviders[i].name)) {
        await Client.findOneAndUpdate({name: "Test"}, {$push: {providers: allProviders[i]._id }})
        .then(() => console.log(`${allProviders[i]._id} was pushed`))
        .catch(err => console.log('An error occured adding the provider', err))
      }
    }
  }
  addProviders()

}

seed()
