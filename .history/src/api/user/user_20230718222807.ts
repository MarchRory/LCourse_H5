import http, { Response } from '@/utils/request'

export interface loginParams {
    username: String,
    password: String
}

export interface token {
    swpu_token: String
}

export default {
    async login(data: loginParams) {
        return await http.post("user/login", data)
    }
}