import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HeadquarterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    headquarter_id: schema.number.optional([
      rules.unique({
        table: "headquarters",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    name: schema.string([rules.maxLength(255)]),
    adress: schema.string([rules.maxLength(255)]),
    city: schema.string([rules.maxLength(255), rules.required()]),
    phone: schema.string([rules.mobile({ locale: ["es-CO"] })]),
  });

  public messages: CustomMessages = {};
}
