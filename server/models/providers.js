const db = require('../database/index.js')
const { Provider } = require('../database/dbModels.js')

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


module.exports = {
  getProviderById,
  createNewProvider,
}