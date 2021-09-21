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


module.exports = {
  getAllClients,
  getClientById,
  getClientByEmail
}

