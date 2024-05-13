import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceExecutionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    service_execution_id: schema.number.optional([
      rules.exists({
        table: "service_executions",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    service_id: schema.number([
      rules.exists({ table: "services", column: "id" }),
      rules.required(),
    ]),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
      rules.required(),
    ]),
  });

  public messages: CustomMessages = {};
}
