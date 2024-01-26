import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  id: string;
  recipe!: Recipe ;


  constructor(private route: ActivatedRoute,private recipeService: RecipeService) { 
    
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.recipeService.getRecipe(this.id).subscribe((recipe:Recipe) => {
      this.recipe = recipe;
  });
    
  }

}
