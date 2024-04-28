import { Unit } from "./unit.model";

export class IngredientDTO {


    public name!: string;
    public quantity!: number;
    public unit!: Unit;
    public unitString!: string ;
    public image!: any;
    public encodeImage!: string;

    constructor(name: string, quantity: number, unit: Unit, encodeImage:string) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.encodeImage = encodeImage;
    }
}