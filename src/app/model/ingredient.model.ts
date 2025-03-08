import {HeatBalance} from "./heatBalance.model";
import {EcologicalBalance} from "./ecologicalBalance.model";

export class Ingredient {
    public name!: string;
    public heatBalance!:HeatBalance ;
    public ecologicalBalance!: EcologicalBalance ;
    public glutenFree!: boolean ;
    public pregnantPermission!: boolean ;
    public vegan!: boolean ;
    public ciqual!: number;
    public unitTogramme!: number;
    public image!: string;
}