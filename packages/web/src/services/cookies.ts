import jsCookie from 'js-cookie'

interface CookieProps {
  [key: string]: string
}

export function setCookies(cookies: CookieProps) {
  Object.keys(cookies).forEach((key) => {
    jsCookie.set(key, cookies[key])
  })
}

export function getAccessToken() {
  return jsCookie.get('accessToken') || null
}

export function getAccountId() {
  return jsCookie.get('accountId') || null
}

export function getUsername() {
  return jsCookie.get('username') || null
}

export function removeAllCookies() {
  jsCookie.remove('accessToken')
  jsCookie.remove('accountId')
  jsCookie.remove('username')
}
