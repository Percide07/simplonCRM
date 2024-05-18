const routerclient = require('./asset/client');
const routercommande = require('./asset/commande');
const routerfacture = require('./asset/facture');
const routerforunisseur = require('./asset/fournisseur');
const express = require('express');

const app = express();
port = 8000;
app.use(express.json());
app.use('/api/clients',routerclient);
app.use('/api/commande',routercommande);
app.use('/api/facture',routerfacture);
app.use('/api/fournisseur',routerforunisseur);
app.listen(port);
