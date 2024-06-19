import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SepultureValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    sepulture_id: schema.number.optional([
      rules.unique({
        table: 'sepultures',
        column: 'id',
        where: { id: this.ctx.request.input('id') },
      }),
    ]),
    description: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(500),
    ]),
    sepulture_type: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(255),
    ]),
    price: schema.number([
      rules.required(),
      rules.range(0, 999999999),
    ]),
    service_id: schema.number([
      rules.required(),
      rules.exists({ table: 'services', column: 'id' })
    ]),
  })

  public messages: CustomMessages = {}
}
