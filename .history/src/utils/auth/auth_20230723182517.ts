import Cookies from 'js-cookie'

const tokenKey = 'swpu_token'

export function getToken() {
    return localStorage.getItem(tokenKey)
}

export function setToken(token: string) {
    localStorage.setItem(tokenKey, token)
    return Cookies.set(tokenKey, token)
}

export function removeToken() {
    localStorage.removeItem(tokenKey)
    return Cookies.remove(tokenKey)
}