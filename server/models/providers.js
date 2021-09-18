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

// Get single Provider by Id

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

// getProviderById('61464982e6b9e39a66de63ed')

// Get single Provider Id by name

// Add new Provider

// Update Provider Information

// Delete Provider