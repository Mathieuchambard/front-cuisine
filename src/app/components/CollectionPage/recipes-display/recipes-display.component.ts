import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'; 

import { RecipeDTO } from 'src/app/model/RecipeDTO.model';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-recipes-display',
  templateUrl: './recipes-display.component.html',
  styleUrls: ['./recipes-display.component.scss']
})

export class RecipesDisplayComponent{
  @Input() recipesName: RecipeDTO[] =[];

  constructor(private recipeService: RecipeService) { 
  
  }

  pressDelete(nameId:string):void{
    this.recipeService.deleteRecipe(nameId).subscribe();
    this.recipesName = this.recipesName.filter(recipe => recipe.nameId !== nameId);  
  }
}
