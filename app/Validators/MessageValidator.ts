import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    message_id: schema.number.optional([
      rules.unique({
        table: "messages",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    user_id: schema.string(),
    content: schema.string({}, [rules.required(), rules.minLength(1)]),
    timestamp: schema.string.optional(),
    chat_id: schema.number([
      rules.required(),
      rules.exists({ table: 'chats', column: 'id', where: { id: this.ctx.request.input('chat_id') } }),
    ]),
  });

  public messages: CustomMessages = {};
}
