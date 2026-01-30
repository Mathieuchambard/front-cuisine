import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Ingredient} from "../../model/ingredient.model";
import {IngredientService} from "../../services/ingredient.service";
import {Router} from "@angular/router";
import {CropperComponent} from "../../cropper/cropper.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-ingredient-creator',
  templateUrl: './ingredient-creator.component.html',
  styleUrls: ['./ingredient-creator.component.scss']
})
export class IngredientCreatorComponent implements OnInit {
  ingredientForm!: FormGroup;
  encodeImage:string = "";

  constructor(private ingredientService: IngredientService,private router: Router,private formbuilder: FormBuilder,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.ingredientForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      unitTogramme: [null, [Validators.required, Validators.min(0)]],

      heatBalance: this.formbuilder.group({
        energieKcal: [null, Validators.required],
        energieKj: [null, Validators.required],
        eau: [null, Validators.required],
        proteines: [null, Validators.required],
        glucides: [null, Validators.required],
        sucres: [null, Validators.required],
        lipides: [null, Validators.required],
        agSature: [null, Validators.required],
        fibres: [null, Validators.required],
        sel: [null, Validators.required],
        sodium: [null, Validators.required],
        calcium: [null, Validators.required],
        fer: [null, Validators.required],
        vitamineD: [null, Validators.required],
        vitamineC: [null, Validators.required]
      }),

      glutenFree: [false],
      pregnantPermission: [false],
      vegan: [false]
    });
  }



  saveIngredient(): void {

    let ingredient: Ingredient = this.ingredientForm.value as Ingredient;
    ingredient.image = this.encodeImage;

    this.ingredientService.addIngredient(ingredient).subscribe(()=> {
      this.router.navigateByUrl('/home');});



  }

  openDialog() {
    const dialogRef = this.dialog.open(CropperComponent, {
      width: '50vw', // 50% de la largeur de la fenêtre
      height: '35vw', // Hauteur égale à la largeur
    });


    dialogRef.afterClosed().subscribe((croppedImage: string) => {
      if (croppedImage) {
        this.encodeImage = croppedImage; // Ajoute l'image à la liste
      }
    });
  }

  deleteImage(){
    this.encodeImage = "";
  }

  isSaveDisabled(): boolean {
    return !this.ingredientForm.valid || this.encodeImage == "";
  }

}
