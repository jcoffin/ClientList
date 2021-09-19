const db = require('../database/index.js')
const { Provider, Client } = require('../database/dbModels.js')

// Get all Providers

const getAllProviders = async function () {

  let providers = await Provider.find({})
  .lean()
  .then(doc => {
    console.log('Here are the providers you requested')
    return doc
  })
  .catch(err => console.log('Could not get providers', err))

  return providers;

}

// Get single Provider by Id (takes a string as a paramater)

const getProviderById = async function (id) {

  let provider = await Provider.findById(id)
  .lean()
  .then(doc => {
    console.log('The provider was sucessfully read');
    return doc
  })
  .catch(err => console.log('Could not get provider', err))

  console.log('HERE', provider);
  return provider;
}

// Get single Provider Id by name

const getProviderByName = async function (providerName) {

  let provider = await Provider.find({name: providerName})
  .lean()
  .then(doc => {
    console.log(`Sucessfully read ${providerName}`);
    return doc
  })
  .catch(err => console.log(`Could not read ${providerName}`, err))

  return provider;
}

// Create new Provider (this will take an object with a name: String, client: array of Client ids as Strings)

const createNewProvider = async function (provider) {

  Provider.create({
    name: provider.name,
    clients: provider.clients
  })
  .then(doc => {
    console.log(`${provider.name} was successfully saved to the database`);
  })
  .catch(err => console.log(`${provider.name} was NOT successfully saved to the database`, err))

}

// createNewProvider({
//   name: 'Provider33',
//   clients: ["61464982e6b9e39a66de63ee", "61464982e6b9e39a66de63ed"]
// })

// Update Provider Information
  // Change name

const changeProviderName = async function (currentProviderName, newProviderName) {

Provider.findOneAndUpdate({name: currentProviderName}, {name: newProviderName}, {
  new: true,
  lean: true
})
.then(doc => {
  console.log(`Provider name changed from ${currentProviderName} to ${newProviderName}`);
  return doc
})
.catch(err => console.log('Could not change name', err))

}
  // Add client

const linkClientWithProvider = async function (clientId, providerId) {

  let promise1 = Provider.findByIdAndUpdate(providerId,
    {$push: {clients: clientId}}, {new: true})
  .then(doc => {
    console.log(`Client ${clientId} added to provider ${providerId}`);
    return doc;
  })
  .catch(err => console.log(`Client ${clientId} was NOT added to provider ${providerId}`, err))

  let promise2 = Client.findByIdAndUpdate(clientId,
    {$push: {providers: providerId}}, {new: true})
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
  // Remove clients

// Delete Provider