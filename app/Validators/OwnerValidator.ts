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
    start_date: schema.date({ format: "yyyy-MM-dd" }),
    end_date: schema.date.optional({ format: "yyyy-MM-dd" }),
  });
  public messages: CustomMessages = {
    "customer_id.required": "El campo customer_id es requerido",
    "customer_id.exists":
      "El campo customer_id no existe en la tabla customers",
    "start_date.required": "El campo start_date es requerido",
    "start_date.date": "El campo start_date debe ser una fecha válida",
  };
}
