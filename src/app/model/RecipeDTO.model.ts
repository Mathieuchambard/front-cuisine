import { Difficulty } from "./difficulty.model";
import { Nutriscore } from "./nutricescore.model";
import { TimeRecipe } from "./timeRecipe.model";

export class RecipeDTO {
    nameId!: string;
    name!: string;
    timeRecipe!: TimeRecipe;
    nutriscore!:Nutriscore;
    difficulty!: Difficulty;
    
    isSelected!: boolean;
    encodeImage! : string[];   
    image: any;
    
    



    constructor(nameId: string,name: string,timeRecipe:TimeRecipe,nutriscore:Nutriscore,difficulty: Difficulty) {
            this.nameId = nameId;
            this.name = name;
            this.timeRecipe=timeRecipe;
            this.nutriscore=nutriscore;
            this.difficulty=difficulty;
        }

    
}