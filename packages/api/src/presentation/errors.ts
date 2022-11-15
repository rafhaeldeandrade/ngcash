export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`${paramName} is invalid`)
    this.name = 'InvalidParamError'
  }
}

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`${paramName} is missing`)
    this.name = 'MissingParamError'
  }
}
