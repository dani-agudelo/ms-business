import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RelocationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    origin: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    destination: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    date: schema.date({}, [
      rules.required(),
      rules.after('today'),
    ]),
    price: schema.number([
      rules.required(),
      rules.range(1, 10000),
    ]),
    is_available: schema.boolean(),
    service_id: schema.number([
      rules.required(),
      rules.exists({ table: 'services', column: 'id' }),
    ]),
  })

  
  public messages: CustomMessages = {}
}
