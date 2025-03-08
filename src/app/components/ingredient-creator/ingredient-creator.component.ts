import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Ingredient} from "../../model/ingredient.model";
import {IngredientService} from "../../services/ingredient.service";
import {RecipeService} from "../../services/recipe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ingredient-creator',
  templateUrl: './ingredient-creator.component.html',
  styleUrls: ['./ingredient-creator.component.scss']
})
export class IngredientCreatorComponent implements OnInit {
  ingredientForm!: FormGroup;
  image!: string;

  constructor(private ingredientService: IngredientService,private router: Router,private formbuilder: FormBuilder) {
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


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Vérifier que c'est bien une image
      if (!file.type.startsWith('image/')) {
        alert("Veuillez sélectionner un fichier image.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveIngredient(): void {

    let ingredient: Ingredient = this.ingredientForm.value as Ingredient;
    ingredient.image = this.image;

    this.ingredientService.addIngredient(ingredient).subscribe(()=> {
      this.router.navigateByUrl('/home');});



  }
}
