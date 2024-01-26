export class Collection {
    name!: string;
    nameId!: string;
    description!: string;
    nRecipe!: number;
    listRecipe!: string[];



    constructor(name: string,nameId: string,description: string,nRecipe: number,listRecipe: string[]) {
            this.name = name;
            this.nameId = nameId;
            this.description = description;
            this.nRecipe = nRecipe;
            this.listRecipe = listRecipe;
        }
}