import { TombstoneGeneratedFields } from "../public";

export interface courseObjectiveItem extends TombstoneGeneratedFields {
    objectivesName: string
    semesterId: string | number
    fixRestrictions: number
}

export interface courseObjectivesResultModel {
    list: courseObjectiveItem[]
    total: number
}