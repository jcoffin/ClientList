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

// Add multiple providers to single Client

const addMultipleProviders = async function (clientId, arrayOfProvidersIds) {
  // need a promise that adds all the providers in the array to the client array

  const asyncLoop = async function () {
    for (let i = 0; i < arrayOfProvidersIds.length; i++) {
      await linkClientWithProvider(clientId, arrayOfProvidersIds[i])
    }
  }
  asyncLoop();
}
//Test1 and all providers
addMultipleProviders("61474c173acc1d07c8a49634", [
  "61474c173acc1d07c8a4963a",
  "61474c173acc1d07c8a49639",
  "61474c173acc1d07c8a49638",
  "61474c173acc1d07c8a49637",
  "61474c173acc1d07c8a49636"
])

// Remove client from provider

// Delete provider entirely

// Get data

// Get Clients Populated

