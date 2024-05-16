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
      rules.unique({
        table: 'rooms',
        column: 'room_name',
        where: { headquarter_id: this.ctx.request.input('headquarter_id') },
      }),
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

  public messages: CustomMessages = {
    'room_name.required': 'El nombre de la sala es requerido',
    'room_name.minLength': 'El nombre de la sala debe tener al menos 1 caracter',
    'room_name.maxLength': 'El nombre de la sala debe tener menos de 255 caracteres',
    'room_name.unique': 'El nombre de la sala ya existe',
    'room_capacity.required': 'La capacidad de la sala es requerida',
    'room_capacity.range': 'La capacidad de la sala debe estar entre 1 y 100',
    'facilities.required': 'Las instalaciones de la sala son requeridas',
    'facilities.minLength': 'Las instalaciones de la sala deben tener al menos 1 caracter',
    'facilities.maxLength': 'Las instalaciones de la sala deben tener menos de 255 caracteres',
    'is_available.required': 'La disponibilidad de la sala es requerida',
    'headquarter_id.required': 'La sede es requerida',
    'headquarter_id.exists': 'La sede no existe',
  }
}
