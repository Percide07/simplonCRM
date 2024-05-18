const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const clients = await prisma.client.findMany();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des clients.' });
    }
}).post(async (req, res) => {
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

router.route('/:id').get(async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await prisma.client.findUnique({
            where: { id_client:id }
        });
        if (!client) {
            res.status(404).json({ error: 'Client non trouvé.' });
        } else {
            res.json(client);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du client.' });
    }
}).delete(async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.client.delete({
            where: { id_client:id }
        });
        res.json({ message: 'Client supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du client.' });
    }
}).put(async (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, address, city, phoneNumber, email } = req.body;
    try {
        const updatedClient = await prisma.client.update({
            where: { id_client:id },
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

module.exports = router ;