import { TombstoneGeneratedFields, pageParams } from '../public/index'

export interface departmentItem extends TombstoneGeneratedFields {
    departmentName: string
    departmentCover: string
    alias: string[]
}

export interface departmentResultModel {
    list: departmentItem[]
    total: number
}

export interface majorItem extends TombstoneGeneratedFields {
    majorName: string
    departmentId: string | number
    department: string
}

export interface majorResultModel {
    list: majorItem[]
    total: number
}

export interface majorPageParmas extends pageParams {
    departmentId: string | number
}