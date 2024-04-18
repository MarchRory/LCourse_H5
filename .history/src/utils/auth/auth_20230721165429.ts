import Cookies from 'js-cookie'

const tokenKey = 'swpu_token'

export function getToken() {
    return Cookies.get(tokenKey)
}

export function setToken(token: string) {
    localStorage.setItem('swpu_token', token)
    return Cookies.set(tokenKey, token)
}

export function removeToken() {
    localStorage.removeItem('swpu_token')
    return Cookies.remove(tokenKey)
}