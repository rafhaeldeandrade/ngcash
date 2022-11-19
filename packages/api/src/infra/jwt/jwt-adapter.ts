import jwt from 'jsonwebtoken'
import { Encrypter, Decrypter } from '@/application/contracts'

export class JWTAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const oneDay = 60 * 60 * 24
    return await new Promise((resolve, reject) => {
      jwt.sign(
        { id: value },
        this.secret,
        {
          expiresIn: oneDay
        },
        (err: Error | null, encoded: string | undefined) => {
          if (err) reject(err)
          if (!encoded) reject(new Error('Token not generated'))
          resolve(encoded as string)
        }
      )
    })
  }

  async isTokenValid(token: string): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err: Error | null, _decoded: any) => {
        if (err) reject(err)
        resolve(true)
      })
    })
  }
}
