import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'; 
import { MatListModule } from '@angular/material/list'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { RecipesDisplayComponent } from './components/CollectionPage/recipes-display/recipes-display.component';
import { CollectionsDisplayComponent } from './components/CollectionPage/collections-display/collections-display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateCollectionComponent } from './components/CollectionPage/create-collection/create-collection.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { RecipeEditorComponent } from './components/recipe-editor/recipe-editor.component';
import { CollectionComponent } from './components/CollectionPage/collection/collection.component';
import { AllRecetteComponent } from './components/all-recette/all-recette.component';
import { CollectionEditorComponent } from './components/CollectionPage/collection-editor/collection-editor.component';
import { CollectionModifierComponent } from './components/CollectionPage/collection-modifier/collection-modifier.component';
import { RecipeModifierComponent } from './components/recipe-modifier/recipe-modifier.component';
import { RecipeCreatorComponent } from './components/recipe-creator/recipe-creator.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ApportBarComponent } from './displayComponents/apport-bar/apport-bar.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipeComponent,
    RecipesDisplayComponent,
    CollectionsDisplayComponent,
    HomePageComponent,
    RecipeEditorComponent,
    CreateCollectionComponent,
    CollectionComponent,
    AllRecetteComponent,
    CollectionEditorComponent,
    CollectionModifierComponent,
    RecipeModifierComponent,
    RecipeCreatorComponent,
    RecipeEditorComponent,
    ApportBarComponent,
    ConfirmDialogComponent
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
    MatFormFieldModule,MatProgressBarModule,
    MatDialogModule 
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
