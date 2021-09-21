const {client, provider } = require('../models/index.js');

const getClientById = async function (req, res) {

  console.log('Here', req.params.clientId)

  let responseData = await client.getClientById(req.params.clientId)

  res.send(responseData)
}

const createClient = async function (req, res) {

  client.createClient(req.body)
  .then(() => res.send('Client created'))
  .catch(err => console.log('Something went wrong', err))
}

const deleteClient = async function(req, res) {
  client.deleteClient(req.body.clientId)
  .then(() => res.send('Client Deleted'))
  .catch(err => console.log('Something went wrong', err))
}

const getAll = async function (req, res) {

  client.getClientsAndProviders()
  .then(doc => {
    res.send(doc);
  })
  .catch(err => console.log('Something went wrong', err))

}

const getClientsAndProvidersPopulated = async function(req, res){
  client.getClientsAndProvidersPopulated()
  .then(doc => {
    res.send(doc);
  })
  .catch(err => console.log('Something went wrong', err))
}


module.exports = {
  getClientById,
  createClient,
  deleteClient,
  getClientsAndProviders,
  getClientsAndProvidersPopulated,
}

