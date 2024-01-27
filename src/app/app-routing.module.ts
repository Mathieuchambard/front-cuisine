import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesDisplayComponent } from './components/CollectionPage/recipes-display/recipes-display.component';
import { CollectionsDisplayComponent } from './components/CollectionPage/collections-display/collections-display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateCollectionComponent } from './components/CollectionPage/create-collection/create-collection.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { CollectionComponent } from './components/CollectionPage/collection/collection.component';
import { AllRecetteComponent } from './components/all-recette/all-recette.component';
import { CollectionModifierComponent } from './components/CollectionPage/collection-modifier/collection-modifier.component';



const routes: Routes = [
  { path: '',  redirectTo: '/accueil', pathMatch: 'full' }, 
  {path: 'administration', component: AdministrationComponent},
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

