import { HashComparer, Hasher } from '@/application/contracts'
import argon2 from 'argon2'

export class Argon2Adapter implements Hasher, HashComparer {
  constructor(
    private readonly argon2Options?: argon2.Options & { raw?: false }
  ) {}

  async hash(value: string): Promise<string> {
    return await argon2.hash(value, this.argon2Options)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, value, this.argon2Options)
  }
}
