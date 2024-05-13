import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HolderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    holder_id: schema.number([
      rules.exists({ table: "holders", column: "id" }),
    ]),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
    ]),
  });
  public messages: CustomMessages = {};
}
