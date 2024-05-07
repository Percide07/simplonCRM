const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Ajouter une facture
app.post('/factures', async (req, res) => {
    const { id_client, date_facture } = req.body;
    try {
        const newFacture = await prisma.facture.create({
            data: {
                id_client,
                date_facture
            }
        });
        res.json(newFacture);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la facture.' });
    }
});

// Lire toutes les factures
app.get('/factures', async (req, res) => {
    try {
        const factures = await prisma.facture.findMany();
        res.json(factures);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des factures.' });
    }
});

// Lire une facture par son ID
app.get('/factures/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const facture = await prisma.facture.findUnique({
            where: { id }
        });
        if (!facture) {
            res.status(404).json({ error: 'Facture non trouvée.' });
        } else {
            res.json(facture);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la facture.' });
    }
});

// Supprimer une facture par son ID
app.delete('/factures/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.facture.delete({
            where: { id }
        });
        res.json({ message: 'Facture supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la facture.' });
    }
});

// Modifier les informations d'une facture par son ID
app.put('/factures/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_client, date_facture } = req.body;
    try {
        const updatedFacture = await prisma.facture.update({
            where: { id },
            data: {
                id_client,
                date_facture
            }
        });
        res.json(updatedFacture);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la modification de la facture.' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
