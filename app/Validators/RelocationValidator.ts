import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RelocationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    relocation_id: schema.number.optional([
      rules.unique({
        table: "relocations",
        column: "id",
      }),
    ]),
    origin: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    destination: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    date: schema.date(
      {
        format: "yyyy-MM-dd",
      },
      [rules.required(), rules.after("today")],
    ),
    price: schema.number([rules.required(), rules.unsigned()]),
    is_available: schema.boolean(),
    service_id: schema.number([
      rules.required(),
      rules.exists({ table: "services", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {};
}
