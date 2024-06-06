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
    payment_method: schema.string( {}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(255),
    ]),
    payment_date: schema.date( {
      format: 'yyyy-MM-dd',
    },
    [
      rules.unique({
        table: 'payments',
        column: 'payment_date',
        where: { 'subscription_id': this.ctx.request.input('subscription_id') },
      }),
    ]),
    subscription_id: schema.number( [
      rules.required(),
      rules.exists({ table: 'subscriptions', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'payment_date.unique': 'No puede haber dos pagos en la misma fecha para la misma suscripción.',
  }
}
