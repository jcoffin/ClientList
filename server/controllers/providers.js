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



module.exports = {
  getAllProviders,
  getProviderById,
  getProviderByName
}