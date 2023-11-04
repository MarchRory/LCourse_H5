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

export interface majorItem extends TombstoneGeneratedFields {

}

export interface majorResulyModel {
    list: majorItem[]
    total: number
}