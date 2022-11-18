import argon2 from 'argon2'

export default {
  argon2Options: {
    type: argon2.argon2id,
    memoryCost: 37888,
    parallelism: 1,
    timeCost: 2
  }
}
