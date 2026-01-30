import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Pour les checkboxes
import { MatButtonModule } from '@angular/material/button'; // Pour les boutons
import { MatListModule } from '@angular/material/list'; // Pour les listes
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipeComponent } from './components/recipe/recipe.component';

import { RecipesDisplayComponent } from './components/recipes-display/recipes-display.component';
import { CollectionsDisplayComponent } from './components/CollectionPage/collections-display/collections-display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateCollectionComponent } from './components/CollectionPage/create-collection/create-collection.component';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RecipeEditorComponent } from './components/recipe-editor/recipe-editor.component';
import { CollectionComponent } from './components/CollectionPage/collection/collection.component';
import { AllRecetteComponent } from './components/all-recette/all-recette.component';
import { CollectionEditorComponent } from './components/CollectionPage/collection-editor/collection-editor.component';
import { CollectionModifierComponent } from './components/CollectionPage/collection-modifier/collection-modifier.component';
import { RecipeModifierComponent } from './components/recipe-modifier/recipe-modifier.component';
import { RecipeCreatorComponent } from './components/recipe-creator/recipe-creator.component';
import { MatSelectModule } from '@angular/material/select'; // Pour les sélecteurs
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Pour les switches (toggle)
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Pour les autocomplétions
import { MatChipsModule } from '@angular/material/chips'; // Pour les chips
import { MatFormFieldModule } from '@angular/material/form-field'; // Pour les champs de formulaire
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Pour les barres de progression
import { MatDialogModule } from '@angular/material/dialog'; // Pour les dialogues
import { ApportBarComponent } from './displayComponents/apport-bar/apport-bar.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SearchComponent } from './search/search.component';
import { IngredientCreatorComponent } from './components/ingredient-creator/ingredient-creator.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import {CropperComponent} from "./cropper/cropper.component";
import {YogaComponent} from "./yoga/yoga.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipeComponent,
    RecipesDisplayComponent,
    CollectionsDisplayComponent,
    HomePageComponent,
    CreateCollectionComponent,
    CollectionComponent,
    AllRecetteComponent,
    CollectionEditorComponent,
    CollectionModifierComponent,
    RecipeModifierComponent,
    RecipeCreatorComponent,
    RecipeEditorComponent,
    ApportBarComponent,
    ConfirmDialogComponent,
    SearchComponent,
    IngredientCreatorComponent,
    CropperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule, MatProgressBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    NgxMatSelectSearchModule,
    ImageCropperComponent, YogaComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
