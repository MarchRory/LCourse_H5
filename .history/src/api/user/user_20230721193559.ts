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
     * 
     */
    async yibanLogin(callback: string) {
        return window.location.href = import.meta.env.VITE_APP_API_BASE_URL + `/user/yiban/login?callback=${callback}`
    },

    /**
     * 通过token获取用户信息
     * @returns 
     */
    async getInfo(token: string) {
        return await request({
            url: '/user/student/user',
            method: 'GET',
            params: { token },
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

    async logOut() {
        return await request({
            url: '/user/logout',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },


}