export class RecipeDTO {
    nameId!: string;
    name!: string;
    
    isSelected!: boolean;
    



    constructor(nameId: string,name: string,image:any) {
            this.nameId = nameId;
            this.name = name;
        }

    
}