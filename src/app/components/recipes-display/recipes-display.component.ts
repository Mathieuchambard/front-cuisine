import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDTO } from 'src/app/model/RecipeDTO.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import {Nutriscore} from "../../model/nutricescore.model";


@Component({
  selector: 'app-recipes-display',
  templateUrl: './recipes-display.component.html',
  styleUrls: ['./recipes-display.component.scss']
})

export class RecipesDisplayComponent{
  @Input() recipesName: RecipeDTO[] =[];

  constructor(private recipeService: RecipeService,private dialog: MatDialog,private router: Router) { 
  
  }
  protected readonly nutriscoreEnum = Nutriscore;

  deleteCruCuit(name:string){
    return name.replace(/\b(cru|cuit)\b/g, '');
  }
}
