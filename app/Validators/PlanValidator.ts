import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    plan_id: schema.number.optional([
      rules.unique({
        table: "plans",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    name: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    description: schema.string.optional({}, [
      rules.minLength(3),
      rules.maxLength(500),
    ]),
    typePlan: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
  });

  public messages: CustomMessages = {
    "name.required": "El nombre es requerido.",
    "name.minLength": "El nombre debe tener al menos 3 caracteres.",
    "name.maxLength": "El nombre no puede exceder los 255 caracteres.",
    "description.minLength": "La descripción debe tener al menos 3 caracteres.",
    "description.maxLength":
      "La descripción no puede exceder los 500 caracteres.",
    "typePlan.required": "El tipo de plan es requerido.",
    "typePlan.minLength": "El tipo de plan debe tener al menos 3 caracteres.",
    "typePlan.maxLength":
      "El tipo de plan no puede exceder los 255 caracteres.",
  };
}
