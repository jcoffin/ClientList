const {client, provider } = require('../models/index.js');

const getAllClients = async function (req, res) {

  let responseData = await client.getAllClients();

  res.send(responseData);

  }


module.exports = {
  getAllClients
}

