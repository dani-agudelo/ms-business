import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceExecutionValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    service_execution_id: schema.number.optional([
      rules.unique({
        table: "service_executions",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    service_id: schema.number.optional([
      rules.exists({ table: "services", column: "id" }),
    ]),
    service: schema.object.optional().members({
      id: schema.number([rules.exists({ table: 'services', column: 'id' })])
    }),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
      rules.required(),
    ]),
    headquarter_id: schema.number.optional([
      rules.exists({ table: "headquarters", column: "id" }),
    ]),
    headquarter: schema.object.optional().members({
      id: schema.number.optional([rules.exists({ table: 'headquarters', column: 'id' })])
    }),
    room_id: schema.number.optional([
      rules.exists({ table: "rooms", column: "id" }),
    ]),
    room: schema.object.optional().members({
      id: schema.number.optional([rules.exists({ table: 'rooms', column: 'id' })])
    })
  });

  public messages: CustomMessages = {
    "service_id.required": "El campo service_id es requerido",
    "service_id.exists": "El campo service_id no existe en la tabla services",
    "customer_id.required": "El campo customer_id es requerido",
    "customer_id.exists":
      "El campo customer_id no existe en la tabla customers",
  };
}
