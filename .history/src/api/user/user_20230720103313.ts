import request from '@/utils/http/request'

export interface loginParams {
    username: String,
    password: String
}

export default {
    /**
     * @param data 
     * @returns swpu_token
     */
    async login(data: loginParams) {
        return await request({
            url: '/user/login',
            method: 'POST',
            data
        })
    },

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
     * 
     * @param userId 用户id, 用于易班和用户账号进行绑定
     * @returns 
     */
    async yibanBathUser(userId: string | number) {
        return await request({
            url: `/user/yiban/bind?id=${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}