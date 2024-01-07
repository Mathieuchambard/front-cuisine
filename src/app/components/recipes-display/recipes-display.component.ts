import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-display',
  templateUrl: './recipes-display.component.html',
  styleUrls: ['./recipes-display.component.scss']
})
export class RecipesDisplayComponent implements OnInit {
  recipesName: String[] =['Recette1', 'Recette2', 'Recette3'];
  

  constructor( private recipeService: RecipeService) { }

  ngOnInit(): void {
    //this.recipesName = this.recipeService.getAllRecipes();
  }

}
