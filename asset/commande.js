const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.route('/').post(async (req, res) => {
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
}).get(async (req, res) => {
    try {
        const commandes = await prisma.commande.findMany();
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
    }
});

router.route('/').get(async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const commande = await prisma.commande.findUnique({
            where: { id_commande:id }
        });
        if (!commande) {
            res.status(404).json({ error: 'Commande non trouvée.' });
        } else {
            res.json(commande);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la commande.' });
    }
}).delete(async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.commande.delete({
            where: { id }
        });
        res.json({ message: 'Commande supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la commande.' });
    }
}).put(async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_facture, id_produit, quantite } = req.body;
    try {
        const updatedCommande = await prisma.commande.update({
            where: { id_commande:id },
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

module.exports = router ;