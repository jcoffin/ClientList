const {client, provider } = require('../models/index.js');

const getAllClients = async function (req, res) {

  let responseData = await client.getAllClients();

  res.send(responseData);

  }

const getClientById = async function (req, res) {

  console.log('Here', req.params.clientId)

  let responseData = await client.getClientById(req.params.clientId)

  res.send(responseData)
}

const getClientByEmail = async function (req, res) {

  console.log('Here', req.params.clientEmail)

  let responseData = await client.getClientByEmail(req.params.clientEmail)

  res.send(responseData)
}

const createClient = async function (req, res) {

  client.createClient(req.body)
  .then(() => res.send('Client created'))
  .catch(err => console.log('Something went wrong', err))
}

const addProviderToClientUsingId = async function (req, res) {

client.addProviderToClientUsingId(req.body.clientId, req.body.providerId)
.then(() => res.send('Provider added to Client'))
.catch(err => console.log('Something went wrong', err))
}

const addProviderToClientUsingEmail = async function (req, res) {

  console.log(req.body)

  client.addProviderToClientUsingEmail(req.body.clientEmail, req.body.providerId)
  .then(() => res.send('Provider added to Client'))
  .catch(err => console.log('Something went wrong', err))
  }

const addMultipleProvidersToClient = async function (req, res) {

  client.addMultipleProvidersToClient(req.body.clientId, req.body.arrayOfProvidersIds)
  .then(() => res.send('Providers have been added'))
  .catch(err => console.log('An error occured', err))
}

const removeProviderFromClient = async function (req, res) {
  client.removeProviderFromClient(req.body.clientId, req.body.providerId)
  .then(() => res.send('Provider removed'))
  .catch(err => console.log('Something went wrong', err))
}


module.exports = {
  getAllClients,
  getClientById,
  getClientByEmail,
  createClient,
  addProviderToClientUsingId,
  addProviderToClientUsingEmail,
  addMultipleProvidersToClient,
  removeProviderFromClient
}

