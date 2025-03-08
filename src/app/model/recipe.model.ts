import { Difficulty } from "./difficulty.model";
import { EcologicalBalance } from "./ecologicalBalance.model";
import { HeatBalance } from "./heatBalance.model";
import { IngredientDTO } from "./ingredientDTO.model";
import { Nutriscore } from "./nutricescore.model";



import { TimeRecipe } from "./timeRecipe.model";
import { Instruction } from "./instruction";

export class Recipe {

    nameId!: string;
    name!: string;
    ingredients!: IngredientDTO[];
    instructions!: Instruction[];
    difficulty!: Difficulty;
    heatBalance!: HeatBalance;
    ecologicalBalance!: EcologicalBalance;
    ecoScore!: number;
    nutriscore!: Nutriscore;
    serves!: number;
    price!: number;
    timeRecipe!: TimeRecipe;
    date!: Date;
    tag!: string[];
    recipeWith!: string[];
    astuceChef!: string;
    encodeImage!: string[];



    constructor(name: string, ingredients: IngredientDTO[], instructions: Instruction[],
        difficulty: Difficulty, serves: number, price: number, timeRecipe: TimeRecipe,encodeImage:string[],tag:string[],recipeWith:string[],astuceChef:string) {
            this.name = name;
            this.ingredients = ingredients;
            this.instructions = instructions;
            this.difficulty = difficulty;
            this.serves = serves;
            this.price = price;
            this.timeRecipe = timeRecipe;
            this.tag = tag;
            this.recipeWith = recipeWith;
            this.astuceChef = astuceChef ;
            this.encodeImage = encodeImage;
        }

}



