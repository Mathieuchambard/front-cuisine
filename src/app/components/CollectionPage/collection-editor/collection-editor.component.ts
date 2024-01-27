import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { Collection } from 'src/app/model/collection.model';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeDTO } from 'src/app/model/RecipeDTO.model';
import { CollectionService } from 'src/app/services/collection.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-collection-editor',
  templateUrl: './collection-editor.component.html',
  styleUrls: ['./collection-editor.component.scss']
})
export class CollectionEditorComponent implements OnInit {
  @Input() inputCollectionSubject!: ReplaySubject<Collection> ;
  inputCollection!:Collection ;
 
  listIngredients: string[] = [];
  nameIngredient: string = "";
  recipeForm!: FormGroup;
  


  allRecipe: RecipeDTO[] = [];
  filteredRecipes: String[] = [];


  constructor( private recipeService: RecipeService, private collectionService: CollectionService,
    private formbuilder: FormBuilder) { 

      this.refreshIngredients(); 
    }



  ngOnInit(): void {
    if (!this.inputCollectionSubject){
      this.recipeForm = this.formbuilder.group({
        name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: ["", [ Validators.maxLength(400)]],
        recipes: this.formbuilder.array([], Validators.required),
      });
    }else{
      this.inputCollectionSubject.subscribe(
        (res:Collection) => {
        this.inputCollection = res;
        let listeRecipesForm = [];
        for (let recipe of res.listRecipe) {
          let formGroup: FormGroup = this.formbuilder.group({
            name: [recipe, Validators.required],
            manual: [false]
          });
      
          listeRecipesForm.push(formGroup);
        }
        this.recipeForm = this.formbuilder.group({
          name: [res.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          description: [res.description, [ Validators.maxLength(400)]],
          recipes: this.formbuilder.array(listeRecipesForm, Validators.required),});
        });
    }
    
  }

  addRecipeCollection() {
    let formGroup: FormGroup = this.formbuilder.group({
      name: ['', Validators.required],
      manual: [false]
    });

    this.filteredRecipes.push(formGroup.get('name')?.value);

    this.formArrayRecipes().push(formGroup);
  }



  removeRecipeCollection(indice: number) {
    this.formArrayRecipes().removeAt(indice);
    this.filteredRecipes.splice(indice, 1);

  }

  formArrayRecipes() : FormArray {
    return this.recipeForm.get("recipes") as FormArray;
  }




  saveCollection(): void {

    

    let listRecipeFormGroup = this.formArrayRecipes().value as FormGroup[]
    let recipes: string[] = [];

    listRecipeFormGroup.forEach((formGroup: any) => {
      let recipe = this.allRecipe.find(RecipeDTO => RecipeDTO.name === formGroup['name']);
      if (recipe != null){recipes.push(recipe.nameId);}
      
    });

    recipes = [...new Set(recipes)];
    

    const monObjet = new Collection (this.recipeForm.get('name')!.value,"",this.recipeForm.get('description')!.value,recipes.length,recipes);

    if (this.inputCollectionSubject){
      this.collectionService.modifyCollection(this.inputCollection.nameId,monObjet).subscribe();
    } else{
      this.collectionService.postCollection(monObjet).subscribe();
    }


  }
  
  refreshIngredients() {
    this.recipeService.getAllRecipes().subscribe((recipesName:RecipeDTO[]) => {
      this.allRecipe = recipesName;
        
  });
  }



}
