import { Time } from "@angular/common";


import { Difficulty } from "./difficulty.model";
import { EcologicalBalance } from "./ecologicalBalance.model";
import { HeatBalance } from "./heatBalance.model";
import { IngredientDTO } from "./ingredientDTO.model";
import { Nutriscore } from "./nutricescore.model";



import { TimeRecipe } from "./timeRecipe.model";

export class Recipe {

    nameId!: string;
    name!: string;
    ingredients!: IngredientDTO[];
    instructions!: string[];
    difficulty!: Difficulty;
    heatBalance!: HeatBalance;
    ecologicalBalance!: EcologicalBalance;
    ecoScore!: number;
    nutriscore!: Nutriscore;
    serves!: number;
    price!: number;
    timeRecipe!: TimeRecipe;
    urlImage!: string;
    date!: Date;

    constructor(name: string, ingredients: IngredientDTO[], instructions: string[],
        difficulty: Difficulty, serves: number, price: number, timeRecipe: TimeRecipe) {
            this.name = name;
            this.ingredients = ingredients;
            this.instructions = instructions;
            this.difficulty = difficulty;
            this.serves = serves;
            this.price = price;
            this.timeRecipe = timeRecipe;
        }

}



