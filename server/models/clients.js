const db = require('../database/index.js')
const { Client } = require('../database/dbModels.js')

// Get all Clients

const getAllClients = async function () {
  let clients = await Client.find({})
  .lean()
  .then(docs => {
    console.log('Successfully read all clients');
    return docs;
  })
  .catch(err => console.log('Could not read all clients', err))

  return clients;
}

// Get single Client by Id

const getClientById = async function (id) {
  let client = await Client.findById(id)
  .lean()
  .then(doc => {
    console.log('The client was sucessfully read');
    return doc
  })
  .catch(err => console.log('Could not get client', err))

  console.log(client)
  return client;
}

// Get single Client Id by name

// Add new Client

// Update Client Information

// Delete Client