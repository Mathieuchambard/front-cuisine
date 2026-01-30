import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from "@angular/common";

interface VideoItem {
  id: number;
  file: string;
  minia: string;
}

type VideoData = {
  [key: string]: VideoItem[];
};


@Component({
  selector: 'app-en-forme-apres-bebe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './en-forme-apres-bebe.component.html',
  styleUrl: './en-forme-apres-bebe.component.scss'
})

export class EnFormeApresBebeComponent implements OnInit {

  // boutons de 1 à 12
  weeks: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

  selectedWeek: number = 1;                // bouton sélectionné
  videosByWeek: VideoData = {};            // toutes les vidéos (JSON complet)
  currentVideos: VideoItem[] = [];         // vidéos de la semaine sélectionnée

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.http.get<VideoData>('assets/videoEnceinte/enForme/info.json')
      .subscribe({
        next: (data) => {
          this.videosByWeek = data;
          this.updateCurrentVideos();
        },
        error: (err) => {
          console.error('Erreur chargement info.json :', err);
        }
      });
  }


  selectWeek(week: number): void {
    this.selectedWeek = week;
    this.updateCurrentVideos();
  }

  updateCurrentVideos(): void {
    const key = this.selectedWeek.toString();  // "1", "2", ..., "12"
    this.currentVideos = this.videosByWeek[key] || [];
  }
}

