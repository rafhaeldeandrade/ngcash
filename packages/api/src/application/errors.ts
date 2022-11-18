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

export class AccountNotFoundError extends Error {
  constructor(accountId: string | number) {
    super(`Account ${accountId} not found`)
    this.name = 'AccountNotFoundError'
  }
}
