const {client, provider } = require('../models/index.js'); // These are the models



const getProviders = async function (req, res) {

  let response = await provider.getAllProviders();

  res.send(response);

}

const getProviderById = async function (req, res) {

  let regEx = /\w\d[^\s\W]*/g;

  let id = req.params.providerId.match(regEx);

  let response = await provider.getProviderById(id);

  res.send(response);
}



module.exports = {
  getProviders,
  getProviderById
}