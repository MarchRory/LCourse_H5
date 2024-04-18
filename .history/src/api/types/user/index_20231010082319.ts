import { TombstoneGeneratedFields } from '../public/index'


interface tokenUserInfoType {
    hasBind: boolean
    userId: string | number
    username: string
    avatar: string | undefined | null
    nickname: string
}
interface nowSemesterType extends TombstoneGeneratedFields {
    semesterName: string
    start: string
    end: string
}
export interface getInfoByTokenResultModel {
    userInfo: tokenUserInfoType
    permissions?: any
    roles?: any
    nowSemester: nowSemesterType
}