import { SchemaValidate } from '@/presentation/contracts'

export class SchemaValidateStub implements SchemaValidate {
  async validate(input: any): Promise<Error | void> {
    return Promise.resolve()
  }
}
