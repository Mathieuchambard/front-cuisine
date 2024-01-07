export enum Unit {
    CL="cl de", G="g de", CAS = "c.a.s de",CAC = "c.a.c de",NUMBER = "nombre de",NONE = "Pas d'unité"
}

export function getUnitByValue(value: string): Unit {
    const indexOfS = Object.values(Unit).indexOf(value as unknown as Unit);

    const key = Object.keys(Unit)[indexOfS];

    return key as Unit;
}