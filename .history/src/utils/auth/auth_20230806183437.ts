const tokenKey = 'swpu_token'

export function getToken() {
    return localStorage.getItem(tokenKey)
}

export function setToken(token: string) {
    return localStorage.setItem(tokenKey, token)
}

export function removeToken(): void {
    return localStorage.removeItem(tokenKey)
}