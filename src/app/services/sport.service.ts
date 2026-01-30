import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  private apiUrl = '/api/sport';
  //private apiUrl = 'http://localhost:8080/api/sport';

  constructor(private http: HttpClient) {}

  // Récupère les cours d'un utilisateur
  getMyCourses(user: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/mycourses/${user}`);
  }

  // Récupère les cours d'une salle à une date
  getCoursesBySalleAndDate(salle: string, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/${salle}/${date}`);
  }


  // Désinscrire un utilisateur
  unregister(courseId: number, user: string) {
    return this.http.delete(`${this.apiUrl}/${courseId}/${user}`, { responseType: 'text' as 'json' });
  }

  // Inscrire un utilisateur
  register(courseId: number, user: string) {
    return this.http.put(`${this.apiUrl}/${courseId}/${user}`, {}, { responseType: 'text' as 'json' });
  }

  getConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/config`);
  }

  saveConfig(config: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/config`, config);
  }
}
