import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    owner_id: schema.number.optional([
      rules.unique({
        table: "owners",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
    ]),
  });
  public messages: CustomMessages = {
    "customer_id.required": "El campo customer_id es requerido",
    "customer_id.exists":
      "El campo customer_id no existe en la tabla customers",
  };
}
