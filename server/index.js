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
app.post('/providers/createNewProvider', providers.createNewProvider)

// Routes for Clients
app.get('/clients/id/:clientId', clients.getClientById)
app.get('/all', clients.getAll) //Has option: populated: true to get providers added
app.post('/clients', clients.createClient)
app.post('/clients/deleteClient', clients.deleteClient)
app.put('/clients/modifyClient', clients.modifyClient)



app.listen(port, () => {
  console.log('Server listening at http://localhost:3000');
})