const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.route('/').post(async (req, res) => {
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
}).get(async (req, res) => {
    try {
        const factures = await prisma.facture.findMany();
        res.json(factures);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des factures.' });
    }
});

router.route('/:id').get(async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const facture = await prisma.facture.findUnique({
            where: { id_facture: id }
        });
        if (!facture) {
            res.status(404).json({ error: 'Facture non trouvée.' });
        } else {
            res.json(facture);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la facture.' });
    }
}).delete(async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.facture.delete({
            where: { id_facture: id }
        });
        res.json({ message: 'Facture supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la facture.' });
    }
}).put(async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_client, date_facture } = req.body;
    try {
        const updatedFacture = await prisma.facture.update({
            where: { id_facture: id },
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

module.exports = router;
