import { TombstoneGeneratedFields } from "../public";

/**
 * 词汇种类的type
 */
export interface vocabularyCategoryType extends TombstoneGeneratedFields {
    type: string
}

export interface vocabularyType extends TombstoneGeneratedFields {
    word: string
    level: number
    typeId: string | number
}