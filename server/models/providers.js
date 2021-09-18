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

  console.log('HERE', providers)
  return providers;

}




// Get single Provider by Id

// Get single Provider Id by name

// Add new Provider

// Update Provider Information

// Delete Provider