import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'; 
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDTO } from 'src/app/model/RecipeDTO.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipes-display',
  templateUrl: './recipes-display.component.html',
  styleUrls: ['./recipes-display.component.scss']
})

export class RecipesDisplayComponent{
  @Input() recipesName: RecipeDTO[] =[];

  constructor(private recipeService: RecipeService,private dialog: MatDialog,private router: Router) { 
  
  }

  pressDelete(nameId:string):void{
    this.recipeService.deleteRecipe(nameId).subscribe();
    this.recipesName = this.recipesName.filter(recipe => recipe.nameId !== nameId);  
  }

  openConfirmationDialogDelete(recipe:RecipeDTO): void {
    let booleanSubject = new BehaviorSubject<boolean>(false);
    let message = "Etes-vous sur de vouloir supprimer la recette " + recipe.name
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { booleanSubject: booleanSubject, message: message }
    });
    
    booleanSubject.subscribe(result =>{ 
      if (result) {
        this.pressDelete(recipe.nameId);
      }
    })

    
  }
  openConfirmationDialogModifier(recipe:RecipeDTO): void {
    let booleanSubject = new BehaviorSubject<boolean>(false);
    let message = "Etes-vous sur de vouloir modifer la recette " + recipe.name
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { booleanSubject: booleanSubject, message: message }
    });
    
    booleanSubject.subscribe(result =>{ 
      if (result) {
        this.router.navigate(['/recetteModifier/' + recipe.nameId]);  
      }
    })

    
  }
  


}
