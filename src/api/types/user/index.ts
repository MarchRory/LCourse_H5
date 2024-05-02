import { TombstoneGeneratedFields } from '../public/index'

/**
 * 账号密码的参数类型
 */
export interface loginParams {
    username: string;
    password: string;
}
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

export const enum PointTypeEnum {
    completeSign = 1,
    writeMailToSelf = 1,
    completeSelfPlan = 2,
    goodCommend = 3
}
export interface PointItem extends TombstoneGeneratedFields {
    content: string  // 积分内容
    point: number    // 积分值
    departmentId: string  // 学院id
    type: PointTypeEnum   // 积分来源
    state: 0 | 1     // 积分是否启用, 0-禁用, 1-启用
}

export type PointHistoryItem = Pick<PointItem, 'id'> & {
    name: string
    integralName: string // 积分项
}

/**
 * @description 寄语
 */
export interface MailToSelfItem extends TombstoneGeneratedFields {
    content: string
    uid: string
    courseId: string
}