import { TombstoneGeneratedFields } from "../public";

export interface courseObjectiveItem extends TombstoneGeneratedFields {
    objectivesName: string
    semester: string | number
    fixRestrictions: number
    completed: number
}

export interface courseObjectivesResultModel {
    list: courseObjectiveItem[]
    total: number
}

export interface courseObjectivesDetail {

}