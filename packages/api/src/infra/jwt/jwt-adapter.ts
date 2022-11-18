import jwt from 'jsonwebtoken'
import { Encrypter } from '@/application/contracts'

export class JWTAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      jwt.sign(
        value,
        this.secret,
        {
          expiresIn: '1d'
        },
        (err: Error | null, encoded: string | undefined) => {
          if (err) reject(err)
          if (!encoded) reject(new Error('Token not generated'))
          resolve(encoded as string)
        }
      )
    })
  }
}
