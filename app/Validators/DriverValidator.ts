import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    driver_id: schema.number.optional([
      rules.unique({
        table: 'drivers',
        column: 'id',
        where: { id: this.ctx.request.input('id') },
      }),
    ]),
    name: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(255),
    ]),
    email: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(255),
    ]),
    document: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(255),
    ]),
    phone: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(255),
    ]),

  })


  public messages: CustomMessages = {}
}
