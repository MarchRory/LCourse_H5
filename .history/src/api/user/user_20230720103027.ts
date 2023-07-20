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
    }
}