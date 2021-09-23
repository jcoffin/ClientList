const axios = require('axios');

//Gets

const getAll = function (populated = 'false') {

    var config = {
      method: 'get',
      url: `http://localhost:3000/all/?populated=${populated}`
    };

    axios(config)
    .then(res => console.log(JSON.stringify(res.data)))
    .catch(err => console.log('Something went wrong', err));
  }

const getClientById = function(clientId) {
  var config = {
    method: 'get',
    url: `http://localhost:3000/clients/id/${clientId}`
  };

  axios(config)
  .then(res => console.log(JSON.stringify(res.data)))
  .catch(err => console.log('Something went wrong', err));
}

const getProviderById = function(ProviderId) {
  var config = {
    method: 'get',
    url: `http://localhost:3000/providers/id/${ProviderId}`
  };

  axios(config)
  .then(res => console.log(JSON.stringify(res.data)))
  .catch(err => console.log('Something went wrong', err));
}

// Posts

const createClient = function(client) {
  var data = JSON.stringify({
    "name": client.name,
    "email": client.email,
    "phone": client.phone,
    "providers": client.providers
  });

  var config = {
    method: 'post',
    url: 'http://localhost:3000/clients/createClient/',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(res => console.log(JSON.stringify(res.data)))
  .catch(err => console.log('Something went wrong', err));
}


