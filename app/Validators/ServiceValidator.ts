import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    service_id: schema.number.optional([
      rules.unique({
        table: 'services',
        column: 'id',
        where: { id: this.ctx.request.input('id') },
      }),
    ]),
    name_service: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(255),
      rules.unique({
        table: 'services', column: 'name_service', whereNot: this.ctx.params.id ? { id: this.ctx.params.id } : undefined,
        caseInsensitive: true,
      }),
    ]),
    is_available: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    // en español
    'name_service.required': 'El campo nombre del servicio es requerido',
    'name_service.minLength': 'El campo nombre del servicio debe tener al menos 1 caracter',
    'name_service.maxLength': 'El campo nombre del servicio debe tener como máximo 255 caracteres',
    'name_service.unique': 'El nombre del servicio ya se encuentra registrado',
  }
}
