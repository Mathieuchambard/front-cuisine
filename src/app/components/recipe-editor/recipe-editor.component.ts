import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Difficulty, getDifficultyByValue } from 'src/app/model/difficulty.model';
import { Ingredient } from 'src/app/model/ingredient.model';
import { IngredientDTO } from 'src/app/model/ingredientDTO.model';
import { Recipe } from 'src/app/model/recipe.model';
import { TimeRecipe } from 'src/app/model/timeRecipe.model';
import { getUnitByValue, Unit } from 'src/app/model/unit.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { map, Observable, ReplaySubject, startWith } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss']
})
export class RecipeEditorComponent implements OnInit {
  @Input() inputRecipeSubject!: ReplaySubject<Recipe> ;
  inputRecipe!:Recipe ;

  listIngredients: string[] = [];
  nameIngredient: string = "";
  recipeForm!: FormGroup;
  encodeImage:string[] = ['','','','',''];

  difficultiesKey = Object.keys(Difficulty);
  difficultiesValue = Object.values(Difficulty);

  unitsKey = Object.keys(Unit);
  unitsValue = Object.values(Unit);

  filteredIngredients: Observable<string[]>[] = [];
  formDataImage!: FormData;


  constructor(private ingredientService: IngredientService, private recipeService: RecipeService,
    private formbuilder: FormBuilder,private router: Router) { 
      this.refreshIngredients();  
    }

  ngOnInit(): void {
    if (!this.inputRecipeSubject){
      this.recipeForm = this.formbuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        ingredients: this.formbuilder.array([], Validators.required),
        instructions: this.formbuilder.array([], Validators.required),
        difficulty: ['', Validators.required],
        serves: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
        cooking: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
        preparation: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
        rest: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]]
      });
    }else{
      this.inputRecipeSubject.subscribe(
        (res:Recipe) => {

          this.recipeForm = this.formbuilder.group({
            name: [res.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            ingredients: this.formbuilder.array([], Validators.required),
            instructions: this.formbuilder.array([], Validators.required),
            difficulty: [res.difficulty, Validators.required],
            serves: [res.serves, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            cooking: [res.timeRecipe.cooking, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            preparation: [res.timeRecipe.preparation, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            rest: [res.timeRecipe.rest, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]]
          });

        this.inputRecipe = res;

        for (let ingredient of res.ingredients){
          let formGroup: FormGroup = this.formbuilder.group({
            quantity: [ingredient.quantity, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            unit: [ingredient.unit, Validators.required],
            name: [ingredient.name, Validators.required],
            manual: [false]
          });
      
          this.formArrayIngredients().push(formGroup);
        }
        for (let instr of res.instructions){
          this.formArrayInstructions().push(this.formbuilder.control(instr));
        }
        
        });
    }
  }

  

  




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ingredientService.listIngredients.filter((option: string) => option.toLowerCase().includes(filterValue)).map((value: string) => value);
  }


  addIngredientRecipe() {
    let formGroup: FormGroup = this.formbuilder.group({
      quantity: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
      unit: ['g', Validators.required],
      name: ['', Validators.required],
      manual: [false]
    });

    this.filteredIngredients.push(formGroup.get('name')!.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value || '')),
    ));

    this.formArrayIngredients().push(formGroup);
  }

  removeIngredientRecipe(indice: number) {
    this.formArrayIngredients().removeAt(indice);
    this.filteredIngredients.splice(indice, 1);

  }

  formArrayIngredients() : FormArray {
    return this.recipeForm.get("ingredients") as FormArray;
  }


  // Gestion des instructions

  formArrayInstructions() : FormArray {
    return this.recipeForm.get("instructions") as FormArray;
  } 

  addInstruction(): void {
    this.formArrayInstructions().push(this.formbuilder.control(''))
  }

 /**
  * Permet de récupérer la valeur du slide-toggle à partir du FormGroup de l'ingrédient auquel il appartient 
  * @param ingredientControl ingredient 
  * @returns la valeur du FormControl manual d'un ingrédient
  */  
  
  getManualValue(ingredientGroup: AbstractControl | null): boolean | null {
    return ingredientGroup?.get('manual')!.value;
  }



  addIngredient(): void {
    this.ingredientService.addIngredient(this.nameIngredient).subscribe(() => {
      this.refreshIngredients();
    });
  
  }




  



  onImageSelected(event:any,id:number) {

    const image:File = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      console.log(base64String);
      this.encodeImage[id] = base64String;
    
    }

    if (image){
      reader.readAsDataURL(image);
    }
  }

  saveRecipe(): void {

    let listIngredientFormGroup = this.formArrayIngredients().value as FormGroup[]
    let ingredients: IngredientDTO[] = [];

    listIngredientFormGroup.forEach((formGroup: any) => {
      let ingredient: IngredientDTO = new IngredientDTO(formGroup['name'], formGroup['quantity'], formGroup['unit']);
      ingredients.push(ingredient);
    });

    let imageClean: string[] = [];
    this.encodeImage.forEach((image:string)=> {
      if (image != "") imageClean.push(image);
    });
    let timeRecipe: TimeRecipe = new TimeRecipe(this.recipeForm.get('cooking')!.value, this.recipeForm.get('preparation')!.value, this.recipeForm.get('rest')!.value);

    let recipe: Recipe = new Recipe(this.recipeForm.get('name')!.value, 
    ingredients, this.recipeForm.get('instructions')!.value, 
    this.recipeForm.get('difficulty')!.value, 
    this.recipeForm.get('serves')!.value, 
    0, timeRecipe,imageClean);

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

  deleteIngredientByName(name: string): void {
    this.ingredientService.deleteIngredientByName(name).subscribe(() => {
      this.refreshIngredients();
    });
  }



}
