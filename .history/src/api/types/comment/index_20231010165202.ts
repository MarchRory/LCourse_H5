import { TombstoneGeneratedFields } from "../public";

/**
 * 词汇种类的type
 */
export interface vocabularyCategoryType extends TombstoneGeneratedFields {
    type: string
}

/**
 * 词汇项type
 */
export interface vocabularyType extends TombstoneGeneratedFields {
    word: string
    level: number
    typeId: string | number
}

export interface vocabularyResultModel {
    list: vocabularyType[]
    total: number
}