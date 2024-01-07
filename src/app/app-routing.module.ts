import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesDisplayComponent } from './components/recipes-display/recipes-display.component';

const routes: Routes = [
  { path: '',  redirectTo: '/accueil', pathMatch: 'full' }, 
  { path: 'recette/:id', component: RecipeComponent },
  { path: 'recettes', component: RecipesDisplayComponent  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

