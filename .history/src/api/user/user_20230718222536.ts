import http, { Response } from '@/utils/http'

export interface loginParams {
    username: String,
    password: String
}

export interface token {
    swpu_token: String
}

export default {
    async ogin(data: loginParams) {
        return await http.post("")
    }
}