import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Ingredient } from '../model/ingredient.model';
import { of } from 'rxjs';
import {Recipe} from "../model/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {


  configUrl = 'http://localhost:8080';
  pre = `${this.configUrl}/ingredients`
  listIngredients: string[] = [];

  constructor(private http: HttpClient) {}

  getAllIngredients(): Observable<string[]> {
    if (this.listIngredients.length == 0) {
      const obsIngredients: Observable<string[]> = this.http.get<string[]>( `${this.pre}`);
      obsIngredients.subscribe((ingredients: string[]) => {
        this.listIngredients = ingredients;
      });
      return obsIngredients;
    } else {
      return of(this.listIngredients);
    }
  }


  addIngredient(ingredient: Ingredient): Observable<any> {
    return this.http.post(`${this.pre}`, ingredient);
  }

}
