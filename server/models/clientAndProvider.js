const db = require('../database/index.js')
const { Client, Provider } = require('../database/dbModels.js')

// This adds a clientId to a provider's provider array and adds the corresponding providerId to that client's provider array

const linkClientWithProvider = async function (clientId, providerId) {

  let promise1 = Provider.findByIdAndUpdate(providerId,
    {$push: {clients: clientId}}, {new: true})
  .then(doc => {
    console.log(`Client ${clientId} added to provider ${providerId}`);
    return doc;
  })
  .catch(err => console.log(`Client ${clientId} was NOT added to provider ${providerId}`, err))

  let promise2 = Client.findByIdAndUpdate(clientId,
    {$push: {providers: providerId}}, {new: true})
  .then(doc => {
    console.log(`Provider ${providerId} added to client ${clientId} `);
    return doc;
  })
  .catch(err => console.log(`Provider ${providerId} was NOT added to client ${clientId} `, err))

  Promise.all([promise1, promise2])
  .then(values => {
    console.log('Update was sucessful', values[0], values[1]);
    return values;
  })
  .catch(err => console.log('Something went wrong', err))

}