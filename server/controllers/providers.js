const {client, provider } = require('../models/index.js'); // These are the models

const getAllProviders = async function (req, res) {

  let responseData = await provider.getAllProviders();

  res.send(response);

}

const getProviderById = async function (req, res) {

  let id = req.params.providerId

  let responseData = await provider.getProviderById(id);

  res.send(responseData);
}

const getProviderByName = async function (req, res) {

  let responseData = await provider.getProviderByName(req.params.providerName);

  res.send(responseData);
}

const createNewProvider = async function (req, res) {

  provider.createNewProvider(req.body)
  .then(() => {
    console.log(`The provider ${req.body.name} was created`);
    res.send(`The provider ${req.body.name} was created`)
  })
  .catch(err => console.log('Something went wrong', err))

}

const changeProviderName = async function (req, res) {

provider.changeProviderName(req.body.currentProviderName, req.body.newProviderName)
.then(() => {
  console.log('Name has been chanced');
  res.send('Name has been changed')
})
.catch(err => console.log('An error occured', err))
}


module.exports = {
  getAllProviders,
  getProviderById,
  getProviderByName,
  createNewProvider,
  changeProviderName
}