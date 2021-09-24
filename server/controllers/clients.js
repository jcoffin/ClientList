const {client} = require('../models/index.js');

const getClientById = async function (req, res) {
  try {
    res.send(await client.getClientById(req.params.clientId));
  } catch (err) {
    console.log('Something went wrong', err);
  }
}

const createClient = function (req, res) {

  client.createClient(req.body)
  .then((doc) => res.send('Client created'))
  .catch(err => console.log('Something went wrong', err))
}

const deleteClient = function(req, res) {
  client.deleteClient(req.body.clientId)
  .then(() => res.send('Client Deleted'))
  .catch(err => console.log('Something went wrong', err))
}

const getAll = function (req, res) {

  if (req.query.populated === 'true') {
    client.getClientsAndProvidersPopulated()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => console.log('Something went wrong', err))
  } else {
    client.getClientsAndProviders()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => console.log('Something went wrong', err))
  }
}

const modifyClient = function (req, res) {

  client.modifyClient(req.body.clientId, req.body.modifiedClient)
  .then(() => {
    res.send('Client modified')
  })
  .catch(err => console.log('Something went wrong', err))

}




module.exports = {
  getClientById,
  modifyClient,
  createClient,
  deleteClient,
  getAll
}

