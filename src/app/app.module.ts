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
import { AdministrationComponent } from './components/administration/administration.component';
import { CollectionComponent } from './components/CollectionPage/collection/collection.component';
import { AllRecetteComponent } from './components/all-recette/all-recette.component';
import { CollectionEditorComponent } from './components/CollectionPage/collection-editor/collection-editor.component';
import { CollectionModifierComponent } from './components/CollectionPage/collection-modifier/collection-modifier.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipeComponent,
    RecipesDisplayComponent,
    CollectionsDisplayComponent,
    HomePageComponent,
    AdministrationComponent,
    CreateCollectionComponent,
    CollectionComponent,
    AllRecetteComponent,
    CollectionEditorComponent,
    CollectionModifierComponent
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
    MatFormFieldModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
