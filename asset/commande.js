const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Ajouter une commande
app.post('/commandes', async (req, res) => {
    const { id_facture, id_produit, quantite } = req.body;
    try {
        const newCommande = await prisma.commande.create({
            data: {
                id_facture,
                id_produit,
                quantite
            }
        });
        res.json(newCommande);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la commande.' });
    }
});

// Lire toutes les commandes
app.get('/commandes', async (req, res) => {
    try {
        const commandes = await prisma.commande.findMany();
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
    }
});

// Lire une commande par son ID
app.get('/commandes/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const commande = await prisma.commande.findUnique({
            where: { id }
        });
        if (!commande) {
            res.status(404).json({ error: 'Commande non trouvée.' });
        } else {
            res.json(commande);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la commande.' });
    }
});

// Supprimer une commande par son ID
app.delete('/commandes/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.commande.delete({
            where: { id }
        });
        res.json({ message: 'Commande supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la commande.' });
    }
});

// Modifier les informations d'une commande par son ID
app.put('/commandes/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_facture, id_produit, quantite } = req.body;
    try {
        const updatedCommande = await prisma.commande.update({
            where: { id },
            data: {
                id_facture,
                id_produit,
                quantite
            }
        });
        res.json(updatedCommande);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la modification de la commande.' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
