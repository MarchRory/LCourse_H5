import request from '@/utils/http/request'
import { Response } from '@/utils/http/types'

export interface loginParams {
    username: String,
    password: String
}

export default {
    /**
     * @param 一个对象，{ username, password }
     * @returns swpu_token
     */
    async login(data: loginParams) {
        return await request({
            url: '/user/login',
            method: 'POST',
            data
        })
    },

    /**
     * 易班授权登录
     * @returns 
     */
    async yibanAuthLogin() {
        return await request({
            url: '/user/yiban/login',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },

    /**
     * 易班账号绑定用户
     * @param userId 用户id, 用于易班和用户账号进行绑定
     * @returns 
     */
    async yibanBindUser(userId: string | number) {
        return await request({
            url: `/user/yiban/bind?id=${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },

    async logout() {
        await request({
            url: '/user/logout',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },


}