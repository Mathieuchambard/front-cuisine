export enum UnitServes {
    SERVES="personnes",
    UNIT="unité",
}

export function getUnitServesByValue(value: string): UnitServes {
    const indexOfS = Object.values(UnitServes).indexOf(value as unknown as UnitServes);

    const key = Object.keys(UnitServes)[indexOfS];

    return key as UnitServes;
}