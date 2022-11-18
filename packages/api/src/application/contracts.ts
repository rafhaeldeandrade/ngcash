export interface Hasher {
  hash: (value: string) => Promise<string>
}

export interface HashComparer {
  compare: (value: string, hash: string) => Promise<boolean>
}

export interface Encrypter {
  encrypt: (value: string) => Promise<string>
}

export interface Decrypter {
  decrypt: (value: string) => Promise<any>
  isTokenExpired: (token: string) => Promise<boolean>
}
