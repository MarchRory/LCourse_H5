import { TombstoneGeneratedFields } from "../public";

export interface templateType {
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