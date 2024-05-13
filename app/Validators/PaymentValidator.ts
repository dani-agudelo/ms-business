import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PaymentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    payment_id: schema.number.optional( [
      rules.unique({
        table: 'payments',
        column: 'id',
        where: { id: this.ctx.request.input('id') },
      }),
    ]),
    amount: schema.number( [
      rules.required(),
      rules.range(0, 999999999),
    ]
    ),
    paymentMethod: schema.string( {}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(255),
    ]),
    paymentDate: schema.date( {
      format: 'yyyy-MM-dd',
    }),
  })

  public messages: CustomMessages = {}
}
