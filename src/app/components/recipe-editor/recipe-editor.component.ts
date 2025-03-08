import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Difficulty, getDifficultyByValue } from 'src/app/model/difficulty.model';
import { Recipe } from 'src/app/model/recipe.model';
import { TimeRecipe } from 'src/app/model/timeRecipe.model';
import {  Unit } from 'src/app/model/unit.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';
import {map, Observable, ReplaySubject, startWith, Subject, take, takeUntil} from 'rxjs';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';



@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss']
})
export class RecipeEditorComponent implements OnInit {
  @Input() inputRecipeSubject!: ReplaySubject<Recipe> ;
  inputRecipe!:Recipe ;

  availableTags = ["Entrée", "Plat", "Dessert", "Accompagnement","Recette du quotidien","Produit de base fait maison"];

  listIngredients: string[] = [];
  nameIngredient: string = "";
  recipeForm!: FormGroup;
  encodeImage:string[] = [];

  difficultiesKey = Object.keys(Difficulty);
  difficultiesValue = Object.values(Difficulty);

  unitsKey = Object.keys(Unit);
  unitsValue = Object.values(Unit);

  filteredIngredients: Observable<string[]>[] = [];
  formDataImage!: FormData;
  tagControls!: any;

  /** list of recipes */
  protected recipes: String[] = ["Pizza","Saucisse","oui"];

  /** control for the selected recipe for multi-selection */
  public recipeMultiCtrl: FormControl<string[]> = new FormControl<string[]>([], { nonNullable: true });

  /** control for the MatSelect filter keyword multi-selection */
  public recipeMultiFilterCtrl: FormControl<string> = new FormControl<string>('', { nonNullable: true });


  /** list of recipes filtered by search keyword */
  public filteredRecipesMulti: ReplaySubject<String[]> = new ReplaySubject<String[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private ingredientService: IngredientService, private recipeService: RecipeService,
    private formbuilder: FormBuilder,private router: Router) { 
      this.refreshIngredients();
    }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }



  ngOnInit(): void {
    //this.bankMultiCtrl.setValue([this.banks[10], this.banks[11], this.banks[12]]);

    // load the initial bank list
    this.filteredRecipesMulti.next(this.recipes.slice());

    // listen for search field value changes
    this.recipeMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterRecipesMulti();
        });



    if (!this.inputRecipeSubject){
      this.recipeForm = this.formbuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        ingredients: this.formbuilder.array([], Validators.required),
        instructions: this.formbuilder.array([]),
        difficulty: ['', Validators.required],
        serves: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
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
          this.tagControls = this.availableTags.map(tag => new FormControl(res.tag.includes(tag)));
          this.recipeForm = this.formbuilder.group({
            name: [res.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            ingredients: this.formbuilder.array([], Validators.required),
            instructions: this.formbuilder.array([]),
            difficulty: [res.difficulty, Validators.required],
            serves: [res.serves, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            cooking: [res.timeRecipe.cooking, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            preparation: [res.timeRecipe.preparation, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            rest: [res.timeRecipe.rest, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0)]],
            tags: this.formbuilder.array(this.tagControls),
            recipeWith: this.formbuilder.array([]),
            astuceChef: [res.astuceChef]
          });


        this.encodeImage = res.encodeImage;
        this.inputRecipe = res;

        for (let ingredient of res.ingredients){
          let formGroup: FormGroup = this.formbuilder.group({
            quantity: [ingredient.quantity, [Validators.required, Validators.pattern(/^\d*\.?\d+$/), Validators.min(0)]],
            unit: [ingredient.unit, Validators.required],
            name: [ingredient.name, Validators.required],
            manual: [false]
          });
      
          this.formArrayIngredients().push(formGroup);
        }




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

  protected setInitialValue() {
    this.filteredRecipesMulti
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          // setting the compareWith property to a comparison function
          // triggers initializing the selection according to the initial value of
          // the form control (i.e. _initializeSelection())
          // this needs to be done after the filteredBanks are loaded initially
          // and after the mat-option elements are available
          this.multiSelect.compareWith = (a: String, b: String) => a && b && a === b;
        });
  }

  protected filterRecipesMulti() {
    if (!this.recipes) {
      return;
    }
    // get the search keyword
    let search = this.recipeMultiFilterCtrl.value;
    if (!search) {
      this.filteredRecipesMulti.next(this.recipes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredRecipesMulti.next(
        this.recipes.filter(name => name.toLowerCase().indexOf(search) > -1)
    );
  }




  private _filter(value: string): string[] {
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

  getIngredientsSelected(): String[]{
    let listIngredient:String[] = [];
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







 /**
  * Permet de récupérer la valeur du slide-toggle à partir du FormGroup de l'ingrédient auquel il appartient 
  * @param ingredientControl ingredient 
  * @returns la valeur du FormControl manual d'un ingrédient
  */  
  
  getManualValue(ingredientGroup: AbstractControl | null): boolean | null {
    return ingredientGroup?.get('manual')!.value;
  }

 
  onMultipleImageSelected(event:any){
    

    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
        const base64String = reader.result as string;
        this.encodeImage.push(base64String); }
          reader.readAsDataURL(file);
        }
    }
  }





  saveRecipe(): void {


    let recipe: Recipe = this.recipeForm.value as Recipe;


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
