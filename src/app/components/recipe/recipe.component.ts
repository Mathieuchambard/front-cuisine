import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Nutriscore } from 'src/app/model/nutricescore.model';
import { Unit } from 'src/app/model/unit.model';
import { IngredientDTO } from 'src/app/model/ingredientDTO.model';
import { HeatBalance } from 'src/app/model/heatBalance.model';
import { apportRecommande } from 'src/app/const/nutritionRecommande';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  unitEnum = Unit;
  nutriscoreEnum = Nutriscore;
  id: string;
  recipe!: Recipe ;
  imagelist: any = [];
  slideIndex = 0;
  actualServes! : number;
  isSupRecoVisible: boolean = false;

  recommandations: HeatBalance = apportRecommande;

  

  
  

  constructor(private route: ActivatedRoute,private recipeService: RecipeService,private _sanitizer: DomSanitizer) { 
    
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.recipeService.getRecipe(this.id).subscribe((recipe:Recipe) => {
      this.recipe = recipe;
      this.actualServes = recipe.serves;
      this.recipe.ecoScore = Math.round(recipe.ecoScore);
      recipe.ingredients.forEach((ingredient:IngredientDTO) => {
        ingredient.unitString = ingredient.unit.toString();
      });
    });
      
  
    }
  tronc(x:number):number{
    return Math.round(x*100)/100;
  }
  addServes():void{
    this.actualServes +=1;
  }

  deleteCruCuit(name:string){
    return name.replace(/\b(cru|cuit)\b/g, '');
  }
  removeServes():void{
    this.actualServes -=1;
    if (this.actualServes == 0){this.actualServes = 1} }
  
  goToPrevious(): void {
    const isFirstSlide = this.slideIndex === 0;
    const newIndex = isFirstSlide
      ? this.recipe.encodeImage.length - 1
      : this.slideIndex - 1;
  
    this.slideIndex = newIndex;
  }
  
  goToNext(): void {
    const isLastSlide = this.slideIndex === this.recipe.encodeImage.length - 1;
    const newIndex = isLastSlide ? 0 : this.slideIndex + 1;
  
    this.slideIndex = newIndex;
  }

  

  showAdditional(): void {
    this.isSupRecoVisible = true;
  }

  hideAdditional(): void {
    this.isSupRecoVisible = false;
  }
    
    


}
