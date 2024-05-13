import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    administrator_id: schema.number.optional([
      rules.exists({ table: "administrators", column: "id" }),
    ]),
    name: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.unique({ table: "administrators", column: "email" }),
    ]),
    responsibility: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    salary: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
  })

  public messages: CustomMessages = {}
}
