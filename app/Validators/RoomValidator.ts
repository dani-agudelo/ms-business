import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    room_id: schema.number.optional([
      rules.unique({
        table: 'rooms',
        column: 'id',
        where: { id: this.ctx.request.input('id') },
      }),
    ]),
    room_name: schema.string({}, [
      rules.minLength(1),
      rules.maxLength(255),
    ]),
    room_capacity: schema.number([
      rules.range(1, 100),
    ]),
    facilities: schema.string({}, [
      rules.minLength(1),
      rules.maxLength(255),
    ]),
    is_available: schema.boolean([
      rules.required(),
    ]),
    headquarter_id: schema.number([
      rules.required(),
      rules.exists({ table: 'headquarters', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {}
}
