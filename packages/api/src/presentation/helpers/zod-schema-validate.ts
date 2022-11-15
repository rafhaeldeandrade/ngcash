import { z } from 'zod'
import { SchemaValidate } from '@/presentation/contracts'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'

export class ZodSchemaValidate implements SchemaValidate {
  constructor(private readonly schema: z.ZodTypeAny) {}

  async validate(input: any): Promise<Error | void> {
    const result = await this.schema.safeParseAsync(input)
    if (!result.success) {
      const issueCode = result.error.issues[0].code
      const issueMessage = result.error.issues[0].message
      const invalidParam = result.error.issues[0].path[0].toString()
      const invalidParams = [
        'invalid_type',
        'invalid_string',
        'invalid_date',
        'too_small',
        'too_big'
      ]
      if (invalidParams.includes(issueCode)) {
        if (issueMessage === 'Required') {
          return new MissingParamError(invalidParam ? invalidParam : 'body')
        }
        return new InvalidParamError(invalidParam ? invalidParam : 'body')
      }
    }
  }
}
