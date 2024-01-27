import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'; 

import { RecipeDTO } from 'src/app/model/RecipeDTO.model';


@Component({
  selector: 'app-recipes-display',
  templateUrl: './recipes-display.component.html',
  styleUrls: ['./recipes-display.component.scss']
})

export class RecipesDisplayComponent{
  @Input() recipesName: RecipeDTO[] =[];

  
}
