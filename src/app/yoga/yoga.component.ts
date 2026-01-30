import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from "@angular/common";

interface Video {
  id: number;
  titre: string;
  niveau: string;
  temps: string;
  intensite: string;
  explication: string;
  materiel: string[];
  file: string;
  minia: string;
  loaded?: boolean;
}

@Component({
  selector: 'app-yoga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yoga.component.html',
  styleUrl: './yoga.component.scss'
})
export class YogaComponent implements OnInit {
  videos: Video[] = [];
  video!: Video ;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Video[]>('/videoYoga/info.json').subscribe(data => {
      this.videos = data;
      this.video = data[0];
      console.log(data)
    });
  }
  // Lorsque l'utilisateur clique : on passe loaded = true puis on tente de lancer la lecture
  playVideo(video: any, index: number) {
    // marque le chargement (créera la balise <video> dans le DOM)
    video.loaded = true;

    // attendre que Angular ait inséré la balise <video> dans le DOM puis jouer
    setTimeout(() => {
      const el = document.getElementById(`video-${index}`) as HTMLVideoElement | null;
      if (el) {
        el.play().catch(err => {
          // si play() est bloqué, ce n'est pas grave : l'utilisateur a cliqué et pourra appuyer sur play manuellement
          console.warn('Impossible de lancer la lecture automatiquement :', err);
        });
      }
    }, 0);
  }

}

