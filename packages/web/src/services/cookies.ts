import jsCookie from 'js-cookie'

interface CookieProps {
  [key: string]: string
}

export function setCookies(cookies: CookieProps) {
  Object.keys(cookies).forEach((key) => {
    jsCookie.set(key, cookies[key])
  })
}
