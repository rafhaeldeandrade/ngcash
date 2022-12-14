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

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
    this.name = 'UserNotFoundError'
  }
}

export class UserNotAuthorizedError extends Error {
  constructor() {
    super('User not authorized')
    this.name = 'UserNotAuthorizedError'
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super('Invalid or expired token, try logging in again')
    this.name = 'InvalidTokenError'
  }
}

export class BalanceIsNotEnoughError extends Error {
  constructor() {
    super('Balance is not enough')
    this.name = 'BalanceIsNotEnoughError'
  }
}
