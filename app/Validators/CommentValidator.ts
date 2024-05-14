import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    comment_id: schema.number.optional([
      rules.unique({
        table: "comments",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    user_id: schema.string(),
    rating: schema.number([rules.range(1, 5)]),
    comment: schema.string({ trim: true }, [rules.maxLength(500)]),
    service_execution_id: schema.number([
      rules.exists({
        table: 'service_executions', column: 'id', where: {
          id: this.ctx.request.input('service_execution_id')
        }
      }),
    ]),
  });

  public messages: CustomMessages = {
    "rating.number": "La calificacion debe ser un numero.",
    "rating.range": "La calificación debe estar entre 1 y 5.",
    "comment.maxLength": "El comentario no puede exceder los 500 caracteres.",
    "service_execution_id.exists": "Service Execution no existe",
  };
}
