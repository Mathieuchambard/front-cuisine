import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe!: Recipe;

  constructor(private router: Router) { 
    let nav: Navigation | null = this.router.getCurrentNavigation();

    if (nav && nav.extras && nav.extras.state) {
      this.recipe = nav.extras.state as Recipe;
    }
  }

  ngOnInit(): void {
  }

}
