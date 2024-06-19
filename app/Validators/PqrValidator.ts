import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PqrValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({}, [
      rules.required(),
      rules.email(),
    ]
    ),
    message: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(500),
    ]),
  });

  public messages: CustomMessages = {}
}
