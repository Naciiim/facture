import {Component, HostListener} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    FormsModule
  ],
  styleUrls: ['./facture.component.css']
})

export class FactureComponent {
  isFactureVisible = true;
  isHistoriqueVisible = false;
  isButtonVisible: boolean = true;

  // Données fictives des créanciers (vous pouvez les obtenir depuis un service API)
  creanciers = [
    { nom: 'Creancier 1', service: 'Service 1' },
    { nom: 'Creancier 2', service: 'Service 2' },
    { nom: 'Creancier 3', service: 'Service 3' }
  ];

  // Historique des paiements (données fictives)
  historiquePaiement = [
    { nom: 'John', prenom: 'Doe', montant: 100, creancier: 'Creancier 1', date: '2024-12-01', userId: 'user1' },
    { nom: 'Jane', prenom: 'Smith', montant: 200, creancier: 'Creancier 2', date: '2024-12-05', userId: 'user2' },
    { nom: 'John', prenom: 'Doe', montant: 150, creancier: 'Creancier 3', date: '2024-12-10', userId: 'user1' }
  ];

  // Utilisateur connecté (exemple, vous pouvez récupérer cela depuis un service d'authentification)
  currentUser = { id: 'user1', name: 'John Doe' };
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Si on est à la fin de la page (en bas)
    if (scrollPosition + windowHeight >= pageHeight - 50) {
      this.isButtonVisible = false;
    } else {
      this.isButtonVisible = true;
    }
  }
  // Sections visibles
  showFacture() {
    this.isFactureVisible = true;
    this.isHistoriqueVisible = false;
  }

  showHistorique() {
    this.isFactureVisible = false;
    this.isHistoriqueVisible = true;
  }

  // Filtrer l'historique des paiements en fonction de l'utilisateur connecté
  getHistoriqueForUser() {
    return this.historiquePaiement.filter(paiement => paiement.userId === this.currentUser.id);
  }

  getImageUrl(nom: string) {
    const imageMap = {
      'Creancier 1': 'assets/OIP.jpg',
      'Creancier 2': 'assets/OIP1.jpg',
      'Creancier 3': 'assets/redal.jpg'
    };
    // @ts-ignore
    return imageMap[nom] || 'assets/bank.jpg';
  }

  isPayFormVisible = false;
  selectedCreancierNom: string | null = null;
  montant: number = 0;
  openPayForm(creancierNom: string) {
    this.selectedCreancierNom = creancierNom;
    this.isPayFormVisible = true;
  }

  // Fermer la fenêtre modale
  closePayForm() {
    this.isPayFormVisible = false;
    this.selectedCreancierNom = null;
    this.montant = 0; // Réinitialiser le montant
  }

  // Soumettre le formulaire de paiement
  submitPayForm() {
    alert(`Paiement de ${this.montant}€ effectué pour ${this.selectedCreancierNom}`);
    this.closePayForm();
  }

}
