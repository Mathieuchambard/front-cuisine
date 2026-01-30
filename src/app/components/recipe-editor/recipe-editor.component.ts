import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Difficulty } from 'src/app/model/difficulty.model';
import { Recipe } from 'src/app/model/recipe.model';
import { TimeRecipe } from 'src/app/model/timeRecipe.model';
import {  Unit } from 'src/app/model/unit.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';
import {map, Observable, ReplaySubject, startWith, Subject, take, takeUntil} from 'rxjs';
import { Router } from '@angular/router';
import {RecipeDTO} from "../../model/RecipeDTO.model";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";


import {MatDialog} from "@angular/material/dialog";
import {CropperComponent} from "../../cropper/cropper.component";
import {UnitServes} from "../../model/unitServes.model";


@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss']
})
export class RecipeEditorComponent implements OnInit {
  @Input() inputRecipeSubject!: ReplaySubject<Recipe> ;
  inputRecipe!:Recipe ;

  recipesName: RecipeDTO[] =[];

  availableTags = ["Entrée", "Plat", "Dessert", "Accompagnement","Recette du quotidien","Produit de base fait maison"];

  listIngredients: string[] = [];
  recipeForm!: FormGroup;
  encodeImage:string[] = [];

  difficultiesKey = Object.keys(Difficulty);
  difficultiesValue = Object.values(Difficulty);

  unitServesKey = Object.keys(UnitServes);
  unitServesValue = Object.values(UnitServes);

  unitsKey = Object.keys(Unit);
  unitsValue = Object.values(Unit);

  filteredIngredients: Observable<string[]>[] = [];
  tagControls!: any;

  recipes: string[] = [];
  recipeCtrl = new FormControl('');
  selectedRecipes: string[] = [];
  filteredRecipes!: Observable<string[]>;
  table: { [p: string]: string } = {};

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.recipes.filter(recipe => recipe.toLowerCase().includes(filterValue));
  }

  // Ajouter une recette via l'autocomplete
  selectRecipe(event: MatAutocompleteSelectedEvent): void {
    const recipe = event.option.viewValue;
    if (!this.selectedRecipes.includes(recipe)) {
      this.selectedRecipes.push(recipe);
    }
    this.recipeCtrl.setValue('');
  }

  // Ajouter une recette via la saisie manuelle
  addRecipe(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.selectedRecipes.includes(value)) {
      this.selectedRecipes.push(value);
    }
    event.chipInput!.clear();
    this.recipeCtrl.setValue('');
  }

  // Supprimer une recette
  removeRecipe(recipe: string): void {
    const index = this.selectedRecipes.indexOf(recipe);
    if (index >= 0) {
      this.selectedRecipes.splice(index, 1);
    }
  }

  constructor(private ingredientService: IngredientService, private recipeService: RecipeService,
    private formbuilder: FormBuilder,private router: Router,public dialog: MatDialog) {
      this.refreshIngredients();
      this.filteredRecipes = this.recipeCtrl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
      );
    }

  isSaveDisabled(): boolean {
    return !this.recipeForm.valid || this.encodeImage.length === 0;
  }


  openDialog() {
    const dialogRef = this.dialog.open(CropperComponent, {
      width: '50vw', // 50% de la largeur de la fenêtre
      height: '35vw', // Hauteur égale à la largeur
    });


    dialogRef.afterClosed().subscribe((croppedImage: string) => {
      if (croppedImage) {
        this.encodeImage.push(croppedImage); // Ajoute l'image à la liste
      }
    });
  }



  ngOnInit(): void {

    this.recipeService.getAllRecipes().subscribe((recipesName:RecipeDTO[]) => {
      this.recipesName = recipesName;
      this.recipes = recipesName.map(recipe => recipe.name); // Extraction des noms
      this.table = this.recipesName.reduce((acc, recipe) => {
        acc[recipe.name] = recipe.nameId;
        return acc;
      }, {} as { [key: string]: any }); // Dictionnaire name => nameID

    });





    if (!this.inputRecipeSubject){
      this.recipeForm = this.formbuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        ingredients: this.formbuilder.array([], Validators.required),
        instructions: this.formbuilder.array([]),
        difficulty: ['', Validators.required],
        serves: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
        unitServes: ['', Validators.required],
        cooking: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
        preparation: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
        rest: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
        tags: this.formbuilder.array([]),
        recipeWith: this.formbuilder.array([]),
        astuceChef: ['']
      });
      // Initialisation des cases à cocher avec des FormControls
      this.tagControls = this.availableTags.map(tag => new FormControl(false));
      this.recipeForm.setControl('tags', this.formbuilder.array(this.tagControls));
    }else{
      this.inputRecipeSubject.subscribe(
        (res:Recipe) => {
          this.selectedRecipes = res.recipeWith.flatMap(element => {
            return Object.keys(this.table).filter(key => this.table[key] === element);
          });

          

          this.tagControls = this.availableTags.map(tag => new FormControl(res.tag.includes(tag)));
          this.recipeForm = this.formbuilder.group({
            name: [res.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            ingredients: this.formbuilder.array([], Validators.required),
            instructions: this.formbuilder.array([]),
            difficulty: [res.difficulty, Validators.required],
            serves: [res.serves, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            unitServes: [res.unitServes, Validators.required],
            cooking: [res.timeRecipe.cooking, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            preparation: [res.timeRecipe.preparation, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            rest: [res.timeRecipe.rest, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            tags: this.formbuilder.array(this.tagControls),
            recipeWith: this.formbuilder.array([]),
            astuceChef: [res.astuceChef]
          });


        this.encodeImage = res.encodeImage;
        this.inputRecipe = res;

        /*
        for (let ingredient of res.ingredients){
          let formGroup: FormGroup = this.formbuilder.group({
            quantity: [ingredient.quantity, [Validators.required, Validators.pattern(/^\d*\.?\d+$/), Validators.min(0)]],
            unit: [ingredient.unit, Validators.required],
            name: [ingredient.name, Validators.required],
            manual: [false]
          });
      
          this.formArrayIngredients().push(formGroup);
        }*/




        for (let instr of res.instructions){
          let formGroup: FormGroup = this.formbuilder.group({
            ingredients: this.formbuilder.array([]),
            instructionString: [instr.instructionString, Validators.required]
          });

          let arrayIngredients = formGroup.get('ingredients') as FormArray;

          for (let ingr of instr.ingredients){
            let formGroupIngr: FormGroup = this.formbuilder.group({
              quantity: [ingr.quantity, [Validators.required, Validators.pattern(/^\d*\.?\d+$/), Validators.min(0)]],
              unit: [ingr.unit, Validators.required],
              name: [ingr.name, Validators.required],
              manual: [false]
            });
            arrayIngredients.push(formGroupIngr);
          }
      
          this.formArrayInstructions().push(formGroup);
        }
        
        });
    }
  }

  deleteImage(index:number){
    this.encodeImage.splice(index,1);
  }


  moveIngredientUp( iIngr: number) {
    const ingredients = this.formArrayIngredients() as FormArray;
    if (iIngr > 0) {
      const current = ingredients.at(iIngr);
      const prev = ingredients.at(iIngr - 1);

      // Échange les valeurs
      const currentValue = current.value;
      const prevValue = prev.value;

      current.setValue(prevValue);
      prev.setValue(currentValue);
    }
  }
  moveIngredientDown(iIngr: number) {

    const ingredients = this.formArrayIngredients() as FormArray;
    if (iIngr < ingredients.length - 1) {
      const current = ingredients.at(iIngr);
      const next = ingredients.at(iIngr + 1);

      // Clone les valeurs des deux FormGroups
      const currentValue = current.value;
      const nextValue = next.value;

      // Échange les valeurs
      current.setValue(nextValue);
      next.setValue(currentValue);
    }
  }

  moveIngredientInstructionDown(instruction: AbstractControl, index: number) {
    const ingredients = this.getIngredients(instruction) as FormArray;
    if (index < ingredients.length - 1) {
      const current = ingredients.at(index);
      const next = ingredients.at(index + 1);

      // Clone les valeurs des deux FormGroups
      const currentValue = current.value;
      const nextValue = next.value;

      // Échange les valeurs
      current.setValue(nextValue);
      next.setValue(currentValue);
    }
  }



  moveIngredientInstructionUp(instruction: AbstractControl, index: number) {
    const ingredients = this.getIngredients(instruction) as FormArray;
    if (index > 0) {
      const current = ingredients.at(index);
      const prev = ingredients.at(index - 1);

      // Échange les valeurs
      const currentValue = current.value;
      const prevValue = prev.value;

      current.setValue(prevValue);
      prev.setValue(currentValue);
    }
  }



  moveInstructionUp(index: number) {
    const instructions = this.formArrayInstructions();
    if (index > 0) {
      const current = instructions.at(index);
      const prev = instructions.at(index - 1);

      instructions.setControl(index, prev);
      instructions.setControl(index - 1, current);
    }
  }

  moveInstructionDown(index: number) {
    const instructions = this.formArrayInstructions();
    if (index < instructions.length - 1) {
      const current = instructions.at(index);
      const next = instructions.at(index + 1);

      instructions.setControl(index, next);
      instructions.setControl(index + 1, current);
    }
  }



  private _filter_ingr(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ingredientService.listIngredients.filter((option: string) => option.toLowerCase().includes(filterValue)).map((value: string) => value);
  }


  addIngredientRecipe() {
    let formGroup: FormGroup = this.formbuilder.group({
      quantity: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/), Validators.min(0)]],
      unit: ['g', Validators.required],
      name: ['', Validators.required],
      manual: [false]
    });

    this.filteredIngredients.push(formGroup.get('name')!.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter_ingr(value || '')),
    ));

    this.formArrayIngredients().push(formGroup);
  }

  removeIngredientRecipe(indice: number) {
    this.formArrayIngredients().removeAt(indice);
    this.filteredIngredients.splice(indice, 1);

  }
  removeInstructionRecipe(iInstr: number) {
    this.formArrayInstructions().removeAt(iInstr);
  }

  formArrayIngredients() : FormArray {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  getIngredientsSelected(): string[]{
    let listIngredient:string[] = [];
    let listIngredientFormGroup = this.formArrayIngredients().value as FormGroup[];
    listIngredientFormGroup.forEach((formGroup: any) => {
      listIngredient.push(formGroup['name']);
    });
    return listIngredient;
  }



  // Gestion des instructions

  formArrayInstructions() : FormArray {
    return this.recipeForm.get("instructions") as FormArray;
  } 

  addInstruction(): void {
    let formGroup: FormGroup = this.formbuilder.group({
      ingredients: this.formbuilder.array([]),
      instructionString: ['', Validators.required]
    });
    this.formArrayInstructions().push(formGroup);
  }


  addIngredientInstruction(i:number) :void{
    let formGroup: FormGroup = this.formbuilder.group({
      quantity: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/), Validators.min(0)]],
      unit: ['', Validators.required],
      name: ['', Validators.required],
      manual: [false]
    });

    this.formArrayIngredientsInstruction(i).push(formGroup);

  }

  removeIngredientInstruction(indiceInstruction: number,indiceIngredient: number) {
    this.formArrayIngredientsInstruction(indiceInstruction).removeAt(indiceIngredient);
  }

  formArrayIngredientsInstruction(i:number) : FormArray {

    const instructionsArray = this.recipeForm.get('instructions') as FormArray;

    const instructionGroup = instructionsArray.at(i) as FormGroup;

    return instructionGroup.get('ingredients') as FormArray;
  }

  getIngredients(instruction:any ): FormArray{
    return instruction.controls["ingredients"] as FormArray;
  }




  saveRecipe(): void {
    let recipe: Recipe = this.recipeForm.value as Recipe;

    recipe.recipeWith = this.selectedRecipes.map(recipe => {return this.table[recipe];});


    recipe.tag = this.recipeForm.value.tags
        .map((checked: boolean, i: number) => checked ? this.availableTags[i] : null)
        .filter((tag: string | null): tag is string => tag !== null);

    let timeRecipe: TimeRecipe = new TimeRecipe(this.recipeForm.get('cooking')!.value, this.recipeForm.get('preparation')!.value, this.recipeForm.get('rest')!.value);
    recipe.timeRecipe = timeRecipe;
    let imageClean: string[] = [];
    this.encodeImage.forEach((image:string)=> {
      if (image != "") imageClean.push(image);
    });
    recipe.encodeImage = imageClean;

    if (this.inputRecipeSubject){
      this.recipeService.modifyRecipe(this.inputRecipe.nameId,recipe).subscribe(()=> {
        this.router.navigateByUrl('/home');
      });
    } else{
      this.recipeService.addRecipe(recipe).subscribe(()=> {
        this.router.navigateByUrl('/home');
      });
    }
    



  }
  
  refreshIngredients() {
    this.ingredientService.getAllIngredients().subscribe((listIngredients: string[]) => {
      this.listIngredients = [];
      listIngredients.forEach((ingredient: string) => {
        this.listIngredients.push(ingredient);
      });
    })
  }




}
