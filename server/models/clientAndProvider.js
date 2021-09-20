const db = require('../database/index.js')
const { Client, Provider } = require('../database/dbModels.js')

// This adds a clientId to a provider's provider array and adds the corresponding providerId to that client's provider array

const linkClientWithProvider = async function (clientId, providerId) {

  let promise1 = Provider.findByIdAndUpdate(providerId, {$push: {clients: clientId}}, {new: true})
  .then(doc => {
    console.log(`Client ${clientId} added to provider ${providerId}`);
    return doc;
  })
  .catch(err => console.log(`Client ${clientId} was NOT added to provider ${providerId}`, err))

  let promise2 = Client.findByIdAndUpdate(clientId, {$push: {providers: providerId}}, {new: true})
  .then(doc => {
    console.log(`Provider ${providerId} added to client ${clientId} `);
    return doc;
  })
  .catch(err => console.log(`Provider ${providerId} was NOT added to client ${clientId} `, err))

  Promise.all([promise1, promise2])
  .then(values => {
    console.log('Update was sucessful', values[0], values[1]);
    return values;
  })
  .catch(err => console.log('Something went wrong', err))

}

// Add multiple providersIds to single Client's providers array and that clientId to all provider's client array that are in the second argument

const addMultipleProviders = async function (clientId, arrayOfProvidersIds) {

  const asyncLoop = async function () {
    for (let i = 0; i < arrayOfProvidersIds.length; i++) {
      await linkClientWithProvider(clientId, arrayOfProvidersIds[i])
    }
  }
  asyncLoop();
}

// Remove provider from client's provider array

const removeProvider = async function (clientId, providerId) {

  let promise1 = Provider.findByIdAndUpdate(providerId, {$pull: {clients: clientId}}, {new: true})
  .then(doc => {
    console.log(`Client ${clientId} removed from provider ${providerId}`);
    return doc;
  })
  .catch(err => console.log(`Client ${clientId} was NOT removed from provider ${providerId}`, err))

  let promise2 = Client.findByIdAndUpdate(clientId, {$pull: {providers: providerId}}, {new: true})
  .then(doc => {
    console.log(`Provider ${providerId} removed from client ${clientId} `);
    return doc;
  })
  .catch(err => console.log(`Provider ${providerId} was NOT removed from client ${clientId} `, err))

  Promise.all([promise1, promise2])
  .then(values => {
    console.log('Removal was sucessful', values[0], values[1]);
    return values;
  })
  .catch(err => console.log('Something went wrong', err))

}

// Remove multiple providers at once from a client's provider array

const removeMultipleProviders = async function(clientId, arrayOfProvidersIds) {

  let asyncLoop = async function () {
    for (let i = 0; i < arrayOfProvidersIds.length; i++) {
      await removeProvider(clientId, arrayOfProvidersIds[i])
    }
  }
  asyncLoop();
}

// Get data as shown in prompt

const getClientsAndProviders = async function() {

  let promise1 = Client.find({})
  .lean()
  .then(docs => {
    docs.forEach(doc => {
      delete doc['__v'];
    })
    return docs
  })
  .catch(err => console.log('Could not read clients from database', err))

  let promise2 = Provider.find({})
  .lean()
  .then(docs => {
    docs.forEach(doc => {
      delete doc['clients'];
      delete doc['__v'];
    })
    return docs;
  })
  .catch(err => console.log('Could not read providers from database', err))

  let result = await Promise.all([promise1, promise2])
  .then(values => {
    console.log('Successfully read all clients and providers');
    let data = {};
    data.clients = values[0];
    data.providers = values[1];
    return data;
  })
  .catch(err => console.log('Something went wrong', err))
  return result
}

// Get Clients Populated

const getClientsAndProvidersPopulated = async function() {

  let promise1 = Client.find({})
  .lean()
  .populate("providers")
  .then(docs => {
    return docs
  })
  .catch(err => console.log('Error reading clients', err))

  let promise2 = Provider.find({})
  .lean()
  .populate("clients")
  .then(docs => {
    return docs
  })
  .catch(err => console.log('Error reading providers', err))

  let result = await Promise.all([promise1, promise2])
  .then(values => {
    let data = {};
    data.clients = values[0];
    data.providers = values[1];
    return data;
  })
  .catch(err => console.log('Something went wrong', err))

  return result;

}

// Delete Client

const deleteClient = async function (clientId) {

let clientProviders = await Client.findById(clientId)
.then(doc => {
  return doc.providers;
})
.catch(err => console.log('Did not get providers', err))

  let asyncLoop = async function (clientId) {
    for(let i = 0; i < clientProviders.length; i++) {
      await removeProvider(clientId, clientProviders[i]);
    }
  }
  await asyncLoop(clientId);

  Client.findByIdAndDelete(clientId)
.then(doc => {
  console.log('Sucessfully removed client');
  return doc
})
.catch(err => console.log('Did not remove client', err))

}



//provider1 and Krayt

// addMultipleProviders("61474c173acc1d07c8a49633", [
//   "61474c173acc1d07c8a4963a",
//   "61474c173acc1d07c8a49639",
//   "61474c173acc1d07c8a49638",
//   "61474c173acc1d07c8a49637",
//   "61474c173acc1d07c8a49636"
// ])

deleteClient("61474c173acc1d07c8a49633")


module.exports = {
  linkClientWithProvider,
  addMultipleProviders,
  removeProvider,
  removeMultipleProviders,
  getClientsAndProviders,
  getClientsAndProvidersPopulated
}