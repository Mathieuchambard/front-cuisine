import { Component, OnInit } from '@angular/core';
import { SportService } from 'src/app/services/sport.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface CoursItem {
  nom: string;
  heure: string;
  salle: string;
}

interface SalleCours {
  [salleName: string]: CoursItem[];
}

interface User {
  compte: string;
  mail: string;
  cours: { [jour: string]: SalleCours };
}





@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit {

  mathieuCourses: any[] = [];
  janneCourses: any[] = [];
  availableCourses: any[] = [];

  selectedAvailableCourse: any = null;

  clubs: { [key: string]: number } = {
    "Tete d'or": 19004,
    "Charpennes": 4228
  };
  clubKeys: string[] = [];

  selectedClub: string = "Tete d'or";
  date: string = '';

  showModal = false;
  config: any;
  jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  salles = ["Tête d'Or", "Charpennes"];


  constructor(private sportService: SportService) {}

  ngOnInit(): void{
    this.clubKeys = Object.keys(this.clubs); // stocke les clés pour le template
    this.loadCourses();
  }

  // Charger les cours réservés pour Mathieu et Janne
  loadCourses(): void {
    this.sportService.getMyCourses('mathieu').subscribe(res => {
      this.mathieuCourses = this.parseCourses(res);
    });
    this.sportService.getMyCourses('janne').subscribe(res => {
      this.janneCourses = this.parseCourses(res);
    });
  }
  formatState(state: string): string {
    switch (state) {
      case 'attending':
        return 'Réservé ✅';
      case 'waiting':
        return 'En attente ⏳';
      default:
        return state;
    }
  }


  parseCourses(res: any): any[] {
    try {
      const data = typeof res === 'string' ? JSON.parse(res) : res;
      return data.map((c: any) => {
        const dtStr = c.started_at || c.startDate;
        let dateFormatted = '';
        let timeFormatted = '';

        if (dtStr) {
          const dt = new Date(dtStr);
          // Format date en français : Mardi 7 octobre 2025
          dateFormatted = new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(dt);
          // Majuscule initiale
          dateFormatted = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

          // Format heure : 19h45
          const hours = dt.getHours().toString().padStart(2, '0');
          const minutes = dt.getMinutes().toString().padStart(2, '0');
          timeFormatted = `${hours}h${minutes}`;
        }

        return {
          id: c.id,
          clubId: c.clubId,
          name: c.name ,
          date: dateFormatted,
          time: timeFormatted,
          status: this.formatState(c.state)
        };
      });
    } catch {
      return [];
    }
  }


  unregister(user: string, courseId: number): void {
    this.sportService.unregister(courseId, user).subscribe({
      next: (res: any) => {
        // Si la réponse est un objet JSON, accéder à la propriété contenant le message
        const message = typeof res === 'string' ? res : res.message;
        alert(message);

        if (message && message.includes('Désinscription réussie')) {
          // Supprime le cours de la liste correspondant à l'utilisateur
          if (user === 'mathieu') {
            this.mathieuCourses = this.mathieuCourses.filter(c => c.id !== courseId);
          } else if (user === 'janne') {
            this.janneCourses = this.janneCourses.filter(c => c.id !== courseId);
          }
        } else {
          console.warn('Erreur lors de la désinscription :', message);
        }
      },
      error: (err) => console.error('Erreur désinscription', err)
    });
  }




  searchCourses(): void {
    if (!this.date || !this.selectedClub) return;

    this.sportService.getCoursesBySalleAndDate(this.selectedClub, this.date)
        .subscribe(res => {
          try {
            const data = typeof res === 'string' ? JSON.parse(res) : res;
            const clubId = this.clubs[this.selectedClub];

            this.availableCourses = data.map((c: any) => {
              const dtStr = c.started_at || c.startDate;
              let dateFormatted = '';
              let timeFormatted = '';

              if (dtStr) {
                const dt = new Date(dtStr);

                // Format date en français : Mardi 7 octobre 2025
                dateFormatted = new Intl.DateTimeFormat('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }).format(dt);
                dateFormatted = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

                // Format heure : 19h45
                const hours = dt.getHours().toString().padStart(2, '0');
                const minutes = dt.getMinutes().toString().padStart(2, '0');
                timeFormatted = `${hours}h${minutes}`;
              }

              return {
                id: c.id,
                clubId: clubId,
                name: c.name || c.session?.name,
                date: dateFormatted,
                time: timeFormatted,
                status: this.formatState(c.status || c.state)
              };
            });
          } catch {
            this.availableCourses = [];
          }
        });
  }


  register(user: string): void {
    if (!this.selectedAvailableCourse) return;

    const c = this.selectedAvailableCourse;
    this.sportService.register(c.id, user).subscribe({
      next: (res) => {
        const message = typeof res === 'string' ? res : JSON.stringify(res); // convertir en string si nécessaire
        alert(message);

        // Mettre à jour la liste si l'inscription a réussi
        if (message.includes("✅")) {
          const newCourse = { ...c, status: "attending" };
          if (user === 'mathieu') this.mathieuCourses.push(newCourse);
          else if (user === 'janne') this.janneCourses.push(newCourse);
        }
      },
      error: (err) => {
        alert("Erreur lors de l'inscription : " + err.message);
      }
    });
  }
  openConfig() {
    this.sportService.getConfig().subscribe({
      next: (data) => {
        this.config = typeof data === 'string' ? JSON.parse(data) : data;
        // Assure que chaque jour a au moins une salle existante
        this.config.forEach((user:User) => {
          this.jours.forEach(jour => {
            if (!user.cours[jour]) user.cours[jour] = {};
            this.salles.forEach(salle => {
              if (!user.cours[jour][salle]) user.cours[jour][salle] = [];
            });
          });
        });
        this.showModal = true;
      },
      error: (err) => console.error('Erreur de chargement', err)
    });
  }

  addCours(userIndex: number, jour: string) {
    // On ajoute toujours dans la première salle par défaut (Tête d'Or)
    this.config[userIndex].cours[jour][this.salles[0]].push({
      nom: '',
      heure: '',
      salle: this.salles[0]
    });
  }

  removeCours(userIndex: number, jour: string, salle: string, index: number) {
    this.config[userIndex].cours[jour][salle].splice(index, 1);
  }

  saveConfig() {
    this.sportService.saveConfig(this.config).subscribe({
      next: () => alert('Configuration sauvegardée !'),
      error: (err) => alert('Erreur lors de la sauvegarde : ' + err.message)
    });
  }

  closeModal() {
    this.showModal = false;
  }

  getAllCours(user: User, jour: string): CoursItem[] {
    const allCours: CoursItem[] = [];
    this.salles.forEach(salle => {
      if (user.cours[jour][salle]) {
        user.cours[jour][salle].forEach(c => {
          // garde le champ salle correctement pour le menu déroulant
          c.salle = c.salle || salle;
          allCours.push(c);
        });
      }
    });
    return allCours;
  }

  removeCoursByCours(user: User, jour: string, cours: CoursItem) {
    if (user.cours[jour][cours.salle]) {
      const index = user.cours[jour][cours.salle].indexOf(cours);
      if (index > -1) {
        user.cours[jour][cours.salle].splice(index, 1);
      }
    }
  }


}
