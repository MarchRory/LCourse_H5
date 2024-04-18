import Cookies from 'js-cookie'

const tokenKey = 'swpu_token'

export function getToken() {
    return localStorage.getItem(tokenKey) || Cookies.get(tokenKey)
}

export function setToken(token: string) {
    return Cookies.set(tokenKey, token) && localStorage.setItem(tokenKey, token)
}

export function removeToken(): void {
    localStorage.removeItem(tokenKey)
    Cookies.remove(tokenKey)
}