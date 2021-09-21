const express = require('express');
const app = express();
const port = 3000;
const db = require('./database');
const { clients, providers } = require('./controllers/index.js');

// MiddleWare
app.use(express.json());

// Server the public folder
app.use(express.static('./public'));

//ROUTES

// Routes for Providers
app.get('/providers/id/:providerId', providers.getProviderById)
app.post('/providers', providers.createNewProvider)

// Routes for Clients
app.get('/clients/id/:clientId', clients.getClientById)
app.post('/clients/addProviders', clients.addProvidersToClient) //This may be a single providerId or an array of providerIds
app.post('/clients', clients.createClient)
app.put('/clients/removeProviders', clients.removeProvidersFromClient)
app.post('/clients/deleteClient', clients.deleteClient)
app.get('/all', clients.getClientsAndProviders)
app.get('/allPopulated', clients.getClientsAndProvidersPopulated)





app.listen(port, () => {
  console.log('Server listening at http://localhost:3000');
})