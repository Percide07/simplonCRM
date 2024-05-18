const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.route('/').post(async (req, res) => {
    const { nom, adresse, ville, telephone, email } = req.body;
    try {
        const newFournisseur = await prisma.fournisseur.create({
            data: {
                nom,
                adresse,
                ville,
                telephone,
                email
            }
        });
        res.json(newFournisseur);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout du fournisseur.' });
    }
}).get(async (req, res) => {
    try {
        const fournisseurs = await prisma.fournisseur.findMany();
        res.json(fournisseurs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des fournisseurs.' });
    }
});

// Lire un fournisseur par son ID
router.route('/:id').get(async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const fournisseur = await prisma.fournisseur.findUnique({
            where: { id_fournisseur:id }
        });
        if (!fournisseur) {
            res.status(404).json({ error: 'Fournisseur non trouvé.' });
        } else {
            res.json(fournisseur);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du fournisseur.' });
    }
}).delete(async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.fournisseur.delete({
            where: { id_fournisseur:id }
        });
        res.json({ message: 'Fournisseur supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du fournisseur.' });
    }
}).put(async (req, res) => {
    const id = parseInt(req.params.id);
    const { nom, adresse, ville, telephone, email } = req.body;
    try {
        const updatedFournisseur = await prisma.fournisseur.update({
            where: { id_fournisseur:id },
            data: {
                nom,
                adresse,
                ville,
                telephone,
                email
            }
        });
        res.json(updatedFournisseur);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la modification du fournisseur.' });
    }
});

module.exports = router;
