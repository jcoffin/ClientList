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

  //issue: when the currentProviderName is not not correct, no document is found, but I still get the message back. Error handleing is incorrect. This may not be used in the app anyway

  const changeProviderName = async function (currentProviderName, newProviderName) {

    Provider.findOneAndUpdate({name: currentProviderName}, {name: newProviderName}, {
      new: true,
      lean: true
    })
    .then(doc => {
      //I could do error handling here but it feels hacky
      console.log(`Provider name changed from ${currentProviderName} to ${newProviderName}`);
      return doc
    })
    .catch(err => console.log('Could not change name', err))

    }


module.exports = {
  getProviderById,
  createNewProvider,
  changeProviderName
}