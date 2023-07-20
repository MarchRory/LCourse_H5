import request from '@/utils/http/request'

export interface loginParams {
    username: String,
    password: String
}

export interface token {
    swpu_token: String
}

export default {
    /**
     * @param data 
     * @returns swpu_token
     */
    async login(data: loginParams) {
        return await request({
            url: '/user/login',
            method: 'GET',
            data
        })
    }
}