import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    chat_id: schema.number.optional([
      rules.unique({
        table: "chats",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    status: schema.boolean(),
    service_execution_id: schema.number([
      rules.exists({ table: "service_executions", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {};
}
