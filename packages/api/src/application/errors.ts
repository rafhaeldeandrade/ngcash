export class UserAlreadyExistsError extends Error {
  constructor(username: string) {
    super(`User with username ${username} already exists`)
    this.name = 'UserAlreadyExistsError'
  }
}

export class WrongCredentialsError extends Error {
  constructor() {
    super('Wrong credentials')
    this.name = 'WrongCredentialsError'
  }
}
