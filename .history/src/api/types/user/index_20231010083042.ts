import { TombstoneGeneratedFields } from '../public/index'

/**
 * 根据token获取用户信息的返回data类型
 */
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


/**
 * 根据token获取学生信息的返回data类型
 */
interface contactType {
    'QQ'?: string
    '微信'?: string
    '电话'?: string
    '邮箱'?: string
}
export interface getInfoByStuIdResultModel {
    avatar: string | null | undefined
    userId: string | number
    name: string | null
    pass?: null | boolean
    evaluate?: null | number | string | boolean
    department: string | null | undefined
    sex: number | null
    enrollmentYear: string | null
    contact: contactType
}