import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    status: schema.boolean(),
    service_execution_id: schema.number([
      rules.exists({ table: 'service_executions', column: 'id' }),
    ]),
  })


  public messages: CustomMessages = {}
}
