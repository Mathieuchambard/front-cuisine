import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  configUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<String[]> {
    return this.http.get<String[]>(this.configUrl + "/recipes");
  }

  getRecipe(name:string) : Observable<Recipe>{
    return this.http.get<Recipe>(this.configUrl + "/recipe/" + name);
  }


  addRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(this.configUrl + "/recipe", recipe);
  }

  
}
