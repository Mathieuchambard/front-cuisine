export class HeatBalance {
    energieKcal: number;
    energieKj: number;

    eau: number;
    proteines: number;
    glucides: number;
    sucres: number;
    lipides: number;
    agSature: number;
    fibres: number;
    sel: number;
    sodium: number;
    calcium: number;
    fer: number;
    vitamineD: number;
    vitamineC: number;

    constructor(energieKcal: number,energieKj: number, eau: number,proteines: number,glucides: number,sucres: number,lipides: number,agSature: number,fibres: number,sel: number,sodium: number,calcium: number,fer: number,vitamineD: number,vitamineC: number) {
        this.energieKcal = energieKcal;
        this.energieKj = energieKj;

        this.eau = eau;
        this.proteines = proteines;
        this.glucides = glucides;
        this.sucres = sucres;
        this.lipides = lipides;
        this.agSature = agSature;
        this.fibres = fibres;
        this.sel = sel;
        this.sodium = sodium;
        this.calcium = calcium;
        this.fer = fer;
        this.vitamineD = vitamineD;
        this.vitamineC = vitamineC;
    }
}