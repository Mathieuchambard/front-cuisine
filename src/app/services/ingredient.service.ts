import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Ingredient } from '../model/ingredient.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {


  configUrl = 'http://localhost:8080';
  listIngredients: Ingredient[] = [];

  constructor(private http: HttpClient) {}

  getAllIngredients(): Observable<Ingredient[]> {
    if (this.listIngredients.length == 0) {
      const obsIngredients: Observable<Ingredient[]> = this.http.get<Ingredient[]>(this.configUrl + "/ingredients");
      obsIngredients.subscribe((ingredients: Ingredient[]) => {
        this.listIngredients = ingredients;
      });
      return obsIngredients;
    } else {
      return of(this.listIngredients);
    }
  }

  deleteIngredientByName(name: string): Observable<any> {
    return this.http.delete(this.configUrl + `/ingredient/${name}`);
  }

  addIngredient(name: string): Observable<any> {
    return this.http.post(this.configUrl + "/ingredient", { "name": name });
  }
}
