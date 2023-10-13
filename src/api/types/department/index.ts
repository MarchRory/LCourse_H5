import { TombstoneGeneratedFields } from '../public/index'

export interface departmentItem extends TombstoneGeneratedFields {
    departmentName: string
    departmentCover: string
    alias: string[]
}

export interface departmentResultModel {
    list: departmentItem[]
    total: number
}