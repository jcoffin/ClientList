const db = require('../database/index.js')
const { Provider } = require('../database/dbModels.js')

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


// Add new Provider

// Update Provider Information

// Delete Provider