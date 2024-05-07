const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Récupérer tous les clients
app.get('/clients', async (req, res) => {
    try {
        const clients = await prisma.client.findMany();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des clients.' });
    }
});

// Récupérer un client par son ID
app.get('/clients/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await prisma.client.findUnique({
            where: { id }
        });
        if (!client) {
            res.status(404).json({ error: 'Client non trouvé.' });
        } else {
            res.json(client);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du client.' });
    }
});

// Ajouter un nouveau client
app.post('/clients', async (req, res) => {
    const { firstName, lastName, address, city, phoneNumber, email } = req.body;
    try {
        const newClient = await prisma.client.create({
            data: {
                firstName,
                lastName,
                address,
                city,
                phoneNumber,
                email
            }
        });
        res.json(newClient);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout du client.' });
    }
});

// Supprimer un client
app.delete('/clients/:id',   async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.client.delete({
            where: { id }
        });
        res.json({ message: 'Client supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du client.' });
    }
});

// Modifier un client
app.put('/clients/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, address, city, phoneNumber, email } = req.body;
    try {
        const updatedClient = await prisma.client.update({
            where: { id },
            data: {
                firstName,
                lastName,
                address,
                city,
                phoneNumber,
                email
            }
        });
        res.json(updatedClient);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la modification du client.' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
