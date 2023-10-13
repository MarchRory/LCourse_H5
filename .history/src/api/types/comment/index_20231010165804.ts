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

/**
 * 某分类词汇的API请求数据data type
 */
export interface vocabularyResultModel {
    list: vocabularyType[]
    total: number
}


export interface templateTypeListParams {
    page: number
    pageSize: number
    level: number
    type: number
    key: string
}

export interface commentTemplate extends TombstoneGeneratedFields {
    templateText: string  // 模板的str
    level: number         // 模板内容对应的分值
    type: number
}

export interface commentTemplateResultModel {
    list: commentTemplate[]
    total: number
}
