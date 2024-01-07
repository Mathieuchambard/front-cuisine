export class TimeRecipe {
    cooking!: number;
    preparation!: number;
    rest!: number;

    constructor(cooking: number, preparation: number, rest: number) {
        this.cooking = cooking;
        this.preparation = preparation;
        this.rest = rest;
    }
}