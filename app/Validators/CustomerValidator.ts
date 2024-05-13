import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customer_id: schema.number.optional([
      rules.exists({ table: "customers", column: "id" }),
    ]),
    name: schema.string(),
    email: schema.string([
      rules.email(),
      rules.unique({ table: "customers", column: "email" }),
    ]),
    document: schema.string([
      rules.unique({ table: "customers", column: "document" }),
    ]),
    phone: schema.string([rules.mobile({ locale: ["es-CO"] })]),
    gender: schema.string([rules.regex(/^(M|F|O)$/)]),
  });
  public messages: CustomMessages = {};
}
