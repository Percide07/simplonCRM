/*
  Warnings:

  - The primary key for the `client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `client` table. All the data in the column will be lost.
  - Added the required column `id_client` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_client` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_client`);

-- CreateTable
CREATE TABLE `Entreprise` (
    `id_entreprise` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_entreprise` VARCHAR(191) NOT NULL,
    `siege_social` VARCHAR(191) NOT NULL,
    `date_creation` DATETIME(3) NOT NULL,
    `identifiant_fiscal` VARCHAR(191) NOT NULL,
    `capital` DOUBLE NOT NULL,
    `nombre_employes` INTEGER NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `responsable` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Entreprise_identifiant_fiscal_key`(`identifiant_fiscal`),
    UNIQUE INDEX `Entreprise_email_key`(`email`),
    PRIMARY KEY (`id_entreprise`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produit` (
    `id_produit` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_produit` VARCHAR(191) NOT NULL,
    `prix_achat` DOUBLE NOT NULL,
    `prix_vente` DOUBLE NOT NULL,
    `taux_marge` DOUBLE NOT NULL,
    `dimension` VARCHAR(191) NOT NULL,
    `taille` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_produit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fournisseur` (
    `id_fournisseur` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Fournisseur_email_key`(`email`),
    PRIMARY KEY (`id_fournisseur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facture` (
    `id_facture` INTEGER NOT NULL AUTO_INCREMENT,
    `id_client` INTEGER NOT NULL,
    `date_facture` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Facture_id_facture_key`(`id_facture`),
    PRIMARY KEY (`id_facture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commande` (
    `id_commande` INTEGER NOT NULL AUTO_INCREMENT,
    `id_facture` INTEGER NOT NULL,
    `id_produit` INTEGER NOT NULL,
    `quantite` INTEGER NOT NULL,

    PRIMARY KEY (`id_commande`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Approvisionnement` (
    `id_approvisionnement` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produit` INTEGER NOT NULL,
    `id_fournisseur` INTEGER NOT NULL,
    `quantite` INTEGER NOT NULL,
    `date_approvisionnement` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_approvisionnement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `Client`(`id_client`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_id_facture_fkey` FOREIGN KEY (`id_facture`) REFERENCES `Facture`(`id_facture`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_id_produit_fkey` FOREIGN KEY (`id_produit`) REFERENCES `Produit`(`id_produit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Approvisionnement` ADD CONSTRAINT `Approvisionnement_id_produit_fkey` FOREIGN KEY (`id_produit`) REFERENCES `Produit`(`id_produit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Approvisionnement` ADD CONSTRAINT `Approvisionnement_id_fournisseur_fkey` FOREIGN KEY (`id_fournisseur`) REFERENCES `Fournisseur`(`id_fournisseur`) ON DELETE RESTRICT ON UPDATE CASCADE;
