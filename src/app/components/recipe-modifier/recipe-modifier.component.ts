import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-modifier',
  templateUrl: './recipe-modifier.component.html',
  styleUrls: ['./recipe-modifier.component.scss']
})
export class RecipeModifierComponent implements OnInit {

  inputRecipeSubject: ReplaySubject<Recipe> = new ReplaySubject();
  recipeName!: string;
  

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { 
    this.recipeName = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.recipeService.getRecipe(this.recipeName).subscribe((recipe:Recipe) => {
        this.inputRecipeSubject.next(recipe);
    });
  }

}
