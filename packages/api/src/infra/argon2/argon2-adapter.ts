import { Hasher } from '@/application/contracts'
import argon2 from 'argon2'

export class Argon2Adapter implements Hasher {
  constructor(
    private readonly argon2Options?: argon2.Options & { raw?: false }
  ) {}

  async hash(value: string): Promise<string> {
    return await argon2.hash(value, this.argon2Options)
  }
}
