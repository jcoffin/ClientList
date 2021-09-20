const {client, provider } = require('../models/index.js'); // These are the models



const getProviders = async function (req, res) {

  let response = await provider.getAllProviders();

  console.log(response);

  res.send(response);

}



module.exports = {
  getProviders
}