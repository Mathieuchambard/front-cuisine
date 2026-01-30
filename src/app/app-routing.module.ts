import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesDisplayComponent } from './components/recipes-display/recipes-display.component';
import { CollectionsDisplayComponent } from './components/CollectionPage/collections-display/collections-display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateCollectionComponent } from './components/CollectionPage/create-collection/create-collection.component';
import { RecipeEditorComponent } from './components/recipe-editor/recipe-editor.component';
import { CollectionComponent } from './components/CollectionPage/collection/collection.component';
import { AllRecetteComponent } from './components/all-recette/all-recette.component';
import { CollectionModifierComponent } from './components/CollectionPage/collection-modifier/collection-modifier.component';
import { RecipeCreatorComponent } from './components/recipe-creator/recipe-creator.component';
import { RecipeModifierComponent } from './components/recipe-modifier/recipe-modifier.component';
import {SearchComponent} from './search/search.component';
import {IngredientCreatorComponent} from "./components/ingredient-creator/ingredient-creator.component";
import {YogaComponent} from "./yoga/yoga.component";
import {SportComponent} from "./sport/sport.component";
import {HomepageEnceinteComponent} from "./cours-enceinte/homepage-enceinte/homepage-enceinte.component";
import {EnFormeApresBebeComponent} from "./cours-enceinte/en-forme-apres-bebe/en-forme-apres-bebe.component";
import {EnceinteEnFormeComponent} from "./cours-enceinte/enceinte-en-forme/enceinte-en-forme.component";


const routes: Routes = [
  { path: '',  redirectTo: '/home', pathMatch: 'full' }, 
  {path: 'recetteCreator', component: RecipeCreatorComponent},
  {path: 'recetteModifier/:id', component: RecipeModifierComponent},
  { path: 'home', component: HomePageComponent },
  { path: 'collectionCreator', component: CreateCollectionComponent },
  { path: 'collectionModifier/:id', component: CollectionModifierComponent },
  { path: 'recette/:id', component: RecipeComponent },
  { path: 'recettes', component: AllRecetteComponent },
  { path: 'search/:id', component: SearchComponent },
  { path: 'collection/:id', component: CollectionComponent  },
  { path: 'collection/:id', component: CollectionComponent  },
  { path: 'collections', component: CollectionsDisplayComponent  },
  { path: 'ingredientCreator', component: IngredientCreatorComponent },
  { path: 'yoga', component: YogaComponent },
  { path: 'sport', component: SportComponent },
  { path: 'homepage-enceinte', component: HomepageEnceinteComponent },
  { path: 'en-forme-apres-bebe', component: EnFormeApresBebeComponent },
  { path: 'enceinte-en-forme', component: EnceinteEnFormeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

