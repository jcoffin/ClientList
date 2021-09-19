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

getAllClients()

// Get single Client by Id

// Get single Client Id by name

// Add new Client

// Update Client Information

// Delete Client