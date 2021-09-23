const axios = require('axios');

const getAll = function (populated = 'false') {

    var config = {
      method: 'get',
      url: `http://localhost:3000/all/?populated=${populated}`,
      headers: { }
    };

    axios(config)
    .then(res => console.log(JSON.stringify(res.data)))
    .catch(err => console.log('Something went wrong', err));
  }