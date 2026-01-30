import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cuisine-front';

  showHeader = true;

  constructor(private router: Router) {
    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          // Liste des routes où le header ne doit PAS s’afficher
          const noHeaderRoutes = ['/yoga','/sport','/homepage-enceinte','/en-forme-apres-bebe','/enceinte-en-forme'];
          this.showHeader = !noHeaderRoutes.includes(event.urlAfterRedirects);
        });
  }
}

