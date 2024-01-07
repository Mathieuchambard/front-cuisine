import { Unit } from "./unit.model";

export class IngredientDTO {

    public name!: string;
    public quantity!: number;
    public unit!: Unit;

    constructor(name: string, quantity: number, unit: Unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}