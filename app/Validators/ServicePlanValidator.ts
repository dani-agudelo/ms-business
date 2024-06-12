import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicePlanValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    service_plan_id: schema.number.optional([
      rules.unique({
        table: 'service_plans',
        column: 'id',
        where: { id: this.ctx.request.input('id') },
      }),
    ]),
    service: schema.object.optional().members({
      id: schema.number([rules.exists({ table: 'services', column: 'id' }),
      rules.required(),
      ])
    }),
    service_id: schema.number.optional([
      rules.exists({ table: 'services', column: 'id' }),
    ]),
    plan_id: schema.number([
      rules.exists({ table: 'plans', column: 'id' }),
      rules.required(),
    ]),

  })


  public messages: CustomMessages = {
    'service.id.exists': 'El campo service_id no existe en la tabla services',
    'plan_id.required': 'El campo plan_id es requerido',
    'plan_id.exists': 'El campo plan_id no existe en la tabla plans',
  }
}
