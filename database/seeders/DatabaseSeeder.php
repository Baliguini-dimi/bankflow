<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Alerte;
use App\Models\Message;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Créer les utilisateurs
        $admin = User::create([
            'name' => 'Administrateur',
            'email' => 'admin@bankflow.ci',
            'password' => Hash::make('password123'),
        ]);

        $superviseur = User::create([
            'name' => 'Superviseur Plateau',
            'email' => 'plateau@bankflow.ci',
            'password' => Hash::make('password123'),
        ]);

        $superviseur2 = User::create([
            'name' => 'Superviseur Yopougon',
            'email' => 'yopougon@bankflow.ci',
            'password' => Hash::make('password123'),
        ]);

        // Créer les transactions
        $transactions = [
            ['reference' => 'TXN-00421', 'agence' => 'Plateau', 'type' => 'Virement', 'montant' => 2500000, 'statut' => 'Validé', 'effectuee_le' => now()->setTime(9, 14)],
            ['reference' => 'TXN-00420', 'agence' => 'Cocody', 'type' => 'Retrait', 'montant' => 780000, 'statut' => 'En attente', 'effectuee_le' => now()->setTime(9, 2)],
            ['reference' => 'TXN-00419', 'agence' => 'Yopougon', 'type' => 'Virement', 'montant' => 15000000, 'statut' => 'Anomalie', 'effectuee_le' => now()->setTime(8, 47)],
            ['reference' => 'TXN-00418', 'agence' => 'Marcory', 'type' => 'Dépôt', 'montant' => 430000, 'statut' => 'Validé', 'effectuee_le' => now()->setTime(8, 31)],
            ['reference' => 'TXN-00417', 'agence' => 'Abobo', 'type' => 'Dépôt', 'montant' => 3200000, 'statut' => 'Validé', 'effectuee_le' => now()->setTime(8, 15)],
            ['reference' => 'TXN-00416', 'agence' => 'Treichville', 'type' => 'Retrait', 'montant' => 650000, 'statut' => 'Validé', 'effectuee_le' => now()->setTime(7, 58)],
            ['reference' => 'TXN-00415', 'agence' => 'Adjamé', 'type' => 'Virement', 'montant' => 8900000, 'statut' => 'Anomalie', 'effectuee_le' => now()->setTime(7, 45)],
            ['reference' => 'TXN-00414', 'agence' => 'Plateau', 'type' => 'Dépôt', 'montant' => 1200000, 'statut' => 'Validé', 'effectuee_le' => now()->setTime(7, 30)],
            ['reference' => 'TXN-00413', 'agence' => 'Cocody', 'type' => 'Virement', 'montant' => 5400000, 'statut' => 'En attente', 'effectuee_le' => now()->setTime(7, 15)],
            ['reference' => 'TXN-00412', 'agence' => 'Yopougon', 'type' => 'Retrait', 'montant' => 290000, 'statut' => 'Validé', 'effectuee_le' => now()->setTime(7, 2)],
        ];

        foreach ($transactions as $t) {
            Transaction::create($t);
        }

        // Créer les alertes
        $alertes = [
            ['titre' => 'Transaction suspecte détectée', 'agence' => 'Yopougon', 'description' => 'Virement de 15 000 000 FCFA hors plafond autorisé.', 'niveau' => 'Critique', 'acquittee' => false],
            ['titre' => 'Solde caisse insuffisant', 'agence' => 'Adjamé', 'description' => 'Le solde de caisse est en dessous du seuil minimum de 500 000 FCFA.', 'niveau' => 'Critique', 'acquittee' => false],
            ['titre' => 'Tentative de connexion échouée', 'agence' => 'Cocody', 'description' => '5 tentatives de connexion échouées sur le compte superviseur.', 'niveau' => 'Avertissement', 'acquittee' => false],
            ['titre' => 'Rapport journalier non soumis', 'agence' => 'Marcory', 'description' => "Le rapport de clôture d'hier n'a pas été soumis avant 20h00.", 'niveau' => 'Avertissement', 'acquittee' => false],
            ['titre' => 'Mise à jour système disponible', 'agence' => 'Siège', 'description' => 'Une mise à jour de sécurité est disponible pour le module de paiement.', 'niveau' => 'Info', 'acquittee' => false],
            ['titre' => 'Nouvelle agence connectée', 'agence' => 'Abobo', 'description' => "L'agence Abobo s'est connectée pour la première fois ce mois-ci.", 'niveau' => 'Info', 'acquittee' => true],
        ];

        foreach ($alertes as $a) {
            Alerte::create($a);
        }

        // Créer les messages
        Message::create([
            'expediteur_id' => $superviseur->id,
            'destinataire_id' => $admin->id,
            'contenu' => 'Bonjour, ouverture de caisse effectuée. Solde : 2 500 000 FCFA.',
            'lu' => true,
            'lu_le' => now(),
        ]);

        Message::create([
            'expediteur_id' => $admin->id,
            'destinataire_id' => $superviseur->id,
            'contenu' => 'Bien reçu. Surveillez les virements au-dessus de 10M FCFA.',
            'lu' => true,
            'lu_le' => now(),
        ]);

        Message::create([
            'expediteur_id' => $superviseur2->id,
            'destinataire_id' => $admin->id,
            'contenu' => 'Transaction suspecte signalée sur le compte 045-XXX.',
            'lu' => false,
        ]);
    }
}