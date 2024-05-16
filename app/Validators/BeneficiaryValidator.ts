import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    beneficiaries_id: schema.number.optional([
      rules.unique({
        table: "beneficiaries",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
      // debe ser unico en la tabla beneficiaries
      rules.unique({
        table: "beneficiaries",
        column: "customer_id",
        where: { owner_id: this.ctx.request.input("owner_id") },
      }),
    ]),
    owner_id: schema.number([
      rules.exists({ table: "owners", column: "id" }),
    ]),
    age: schema.number.optional([rules.range(0, 120)]),
  });
  public messages: CustomMessages = {
    "customer_id.required": "El campo customer_id es requerido",
    "customer_id.exists":
      "El campo customer_id no existe en la tabla customers",
    "age.range": "El campo age debe estar entre 0 y 120",
  };
}
