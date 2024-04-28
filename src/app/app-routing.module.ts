import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesDisplayComponent } from './components/CollectionPage/recipes-display/recipes-display.component';
import { CollectionsDisplayComponent } from './components/CollectionPage/collections-display/collections-display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateCollectionComponent } from './components/CollectionPage/create-collection/create-collection.component';
import { RecipeEditorComponent } from './components/recipe-editor/recipe-editor.component';
import { CollectionComponent } from './components/CollectionPage/collection/collection.component';
import { AllRecetteComponent } from './components/all-recette/all-recette.component';
import { CollectionModifierComponent } from './components/CollectionPage/collection-modifier/collection-modifier.component';
import { RecipeCreatorComponent } from './components/recipe-creator/recipe-creator.component';
import { RecipeModifierComponent } from './components/recipe-modifier/recipe-modifier.component';



const routes: Routes = [
  { path: '',  redirectTo: '/home', pathMatch: 'full' }, 
  {path: 'recetteCreator', component: RecipeCreatorComponent},
  {path: 'recetteModifier/:id', component: RecipeModifierComponent},
  { path: 'home', component: HomePageComponent },
  { path: 'collectionCreator', component: CreateCollectionComponent },
  { path: 'collectionModifier/:id', component: CollectionModifierComponent },
  { path: 'recette/:id', component: RecipeComponent },
  { path: 'recettes', component: AllRecetteComponent },
  { path: 'collection/:id', component: CollectionComponent  },
  { path: 'collections', component: CollectionsDisplayComponent  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

