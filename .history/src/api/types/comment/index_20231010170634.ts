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
export interface vocabularyCategoryResultModel {
    list: vocabularyCategoryType[]
    total: number
}
/**
 * 获取模板列表、词汇的请求参数
 */
export interface templateAndVocabularyListParamsType {
    page: number
    pageSize: number
    level?: number
    typeId?: number | string
    type?: number
    key?: string
}

/**
 * 评价模板项的type
 */
export interface commentTemplate extends TombstoneGeneratedFields {
    templateText: string  // 模板的str
    level: number         // 模板内容对应的分值
    type: number
}
export interface commentTemplateResultModel {
    list: commentTemplate[]
    total: number
}
