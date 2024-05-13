import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cremation_id: schema.number.optional([
      rules.exists({
        table: "cremations",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    service_id: schema.number([
      rules.exists({ table: "services", column: "id" }),
      rules.required(),
    ]),
    room_id: schema.number([
      rules.exists({ table: "rooms", column: "id" }),
      rules.required(),
    ]),
    location: schema.string([
      rules.unique({
        table: "cremations",
        column: "location",
        caseInsensitive: true,
      }),
    ]),
    date: schema.date({ format: "yyyy-MM-dd HH:mm" }, [rules.required()]),
    price: schema.number([rules.required()]),
    is_available: schema.boolean([rules.required()]),
  });

  public messages: CustomMessages = {};
}
