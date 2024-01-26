import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { RecipeDTO } from '../model/RecipeDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  configUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<RecipeDTO[]> {
    return this.http.get<RecipeDTO[]>(this.configUrl + "/recipes");
  }

  getRecipe(name:string) : Observable<Recipe>{
    return this.http.get<Recipe>(this.configUrl + "/recipe/" + name);
  }


  addRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(this.configUrl + "/recipe", recipe);
  }

  
  getAllRecipeCollection(nameCollection:String): Observable<RecipeDTO[]> {
    return this.http.get<RecipeDTO[]>(this.configUrl + "/recipes/" + nameCollection);
  }
}
