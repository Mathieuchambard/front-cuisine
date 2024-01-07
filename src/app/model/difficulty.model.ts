export enum Difficulty {
    EASY="Facile",
    NORMAL="Normale",
    HARD="Difficile"
}

export function getDifficultyByValue(value: string): Difficulty {
    const indexOfS = Object.values(Difficulty).indexOf(value as unknown as Difficulty);

    const key = Object.keys(Difficulty)[indexOfS];

    return key as Difficulty;
}