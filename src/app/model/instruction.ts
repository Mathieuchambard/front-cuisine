import { IngredientDTO } from "./ingredientDTO.model";

export class Instruction {
    instructionString!: string;
    ingredients!: IngredientDTO[];

    constructor(instructionString: string,ingredients: IngredientDTO[]) {
        this.instructionString = instructionString;
        this.ingredients = ingredients;
    }
}
