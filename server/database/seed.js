const { Client, Provider } = require('./dbModels.js');
const model = require('../models/index.js')
const db = require('./index.js')


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


  let Provider1Id = await model.clients.getProviderByName('Provider1')
  .then(doc => doc._id)

  console.log('Here is the DATA I SEEK', Provider1Id)
}

seed()
