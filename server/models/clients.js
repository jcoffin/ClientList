const db = require('../database/index.js');
const { Client } = require('../database/dbModels.js');

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

  return client;
}

// Get single Client by name

const getClientByEmail = async function(clientEmail) {

  let client = await Client.find({email: clientEmail})
  .lean()
  .then(doc => {
    console.log('Sucessfully read client');
    return doc
  })
  .catch(err => console.log('Could not read client', err))

  return client;
}

// Add new Client (this will take a client object as a parameter)

const createClient = async function(client) {

  Client.create({
    name: client.name,
    email: client.email,
    phone: client.phone,
    providers: client.providers
  })
  .then(doc => {
    console.log('Client sucessfully created')
  })
  .catch(err => console.log('Could not create client', err))
}

// Update Client Information

// This adds a providerId to the client's provider array

const addProviderToClient = async function (clientId, providerId) {

  Client.findByIdAndUpdate(clientId, {$push: {providers: providerId}}, {new: true})
  .then(doc => {
    console.log(`Provider ${providerId} added to client ${clientId} `);
    return doc;
  })
  .catch(err => console.log(`Provider ${providerId} was NOT added to client ${clientId} `, err))

}

// This adds multiple providerIds to the client's provider array

const addMultipleProvidersToClient = async function (clientId, arrayOfProvidersIds) {

  const asyncLoop = async function () {
    for (let i = 0; i < arrayOfProvidersIds.length; i++) {
      await addProviderToClient(clientId, arrayOfProvidersIds[i])
    }
  }
  asyncLoop();
}

// Remove provider from client's provider array

const removeProviderFromClient = async function (clientId, providerId) {

  Client.findByIdAndUpdate(clientId, {$pull: {providers: providerId}}, {new: true})
  .then(doc => {
    console.log(`Provider ${providerId} removed from client ${clientId} `);
    return doc;
  })
  .catch(err => console.log(`Provider ${providerId} was NOT removed from client ${clientId} `, err))
}

// Remove multiple providers at once from a client's provider array

const removeMultipleProvidersFromClient = async function(clientId, arrayOfProvidersIds) {

  let asyncLoop = async function () {
    for (let i = 0; i < arrayOfProvidersIds.length; i++) {
      await removeProviderFromClient(clientId, arrayOfProvidersIds[i])
    }
  }
  asyncLoop();
}

// Delete Client

const deleteClient = async function (clientId) {

  Client.findByIdAndDelete(clientId)
  .then(doc => {
    console.log('Sucessfully removed client');
    return doc
  })
  .catch(err => console.log('Did not remove client', err))

  }

module.exports = {
  addProviderToClient,
  addMultipleProvidersToClient,
  removeProviderFromClient,
  removeMultipleProvidersFromClient,
  getAllClients,
  getClientById,
  getClientByEmail,
  createClient
}