import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { RecipeDTO } from '../model/RecipeDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  //configUrl = 'http://vps-ebb3514f.vps.ovh.net:8080';
  configUrl = 'http://localhost:8080';
  pre = `${this.configUrl}/recipe`

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<RecipeDTO[]> {
    return this.http.get<RecipeDTO[]>( `${this.pre}`);
  }

  getRecipe(name:string) : Observable<Recipe>{
    return this.http.get<Recipe>(`${this.pre}/${name}`);
  }


  addRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(`${this.pre}`, recipe);
  }

  modifyRecipe(nameId:string,recipe:Recipe): Observable<Recipe>{
    return this.http.put<Recipe>(`${this.pre}/${nameId}`,recipe);
  }

  
  getAllRecipeCollection(nameCollection:String): Observable<RecipeDTO[]> {
    return this.http.get<RecipeDTO[]>(`${this.pre}/collection/${nameCollection}`);
  }

  deleteRecipe(nameId:string): Observable<string> {
    return this.http.delete<string>(`${this.pre}/${nameId}`);
  }
}
