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
/**
 * 根据token获取用户新的的返回值类型
 */
export interface getInfoByTokenResultModel {
    userInfo: tokenUserInfoType
    permissions?: any
    roles?: any
    nowSemester: nowSemesterType
}


interface contact {
    'QQ'?: string
    '微信'?: string
    '电话'?: string
    '邮箱'?: string
}