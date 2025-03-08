import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importer Router

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    searchQuery: string = ''; // La requête de recherche

    constructor(private router: Router) { }

    ngOnInit(): void {}

    // Méthode qui sera appelée lorsque l'utilisateur appuie sur Entrée
    onSearch(): void {
        if (this.searchQuery.trim() !== '') {
            // Rediriger l'utilisateur vers la page /search/{searchQuery}
            this.router.navigate([`/search/${this.searchQuery}`]);
            this.searchQuery = '';
        }
    }
}
