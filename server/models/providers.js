const db = require('../database/index.js')
const { Provider } = require('../database/dbModels.js')

// Get all Providers

const getAllProviders = async function () {

  let providers = await Provider.find({})
  .lean()
  .then(doc => {
    console.log('Here are the providers you requested');
    return doc;
  })
  .catch(err => console.log('Could not get providers', err))

  return providers;

}

// Get single Provider by Id (id needs to be a string)

const getProviderById = async function (id) {

  let provider = await Provider.findById(id)
  .lean()
  .then(doc => {
    console.log('The provider was sucessfully read');
    return doc
  })
  .catch(err => console.log('Could not get provider', err))

  return provider;
}

// Get single Provider by name

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
    name: provider.name
  })
  .then(doc => {
    console.log(`${provider.name} was successfully saved to the database`);
  })
  .catch(err => console.log(`${provider.name} was NOT successfully saved to the database`, err))

}

// Update Provider Information
  // Change provider name

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

// Delete Provider



module.exports = {
  getAllProviders,
  getProviderById,
  getProviderByName,
  createNewProvider,
  changeProviderName
}