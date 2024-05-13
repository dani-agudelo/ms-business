import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    administrator_id: schema.number.optional([
      rules.unique({
        table: "administrators",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    name: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.unique({ table: "administrators", column: "email" }),
    ]),
    responsibility: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    salary: schema.number([rules.required(), rules.unsigned()]),
  });

  public messages: CustomMessages = {
    "name.required": "El campo nombre es requerido",
    "name.minLength": "El campo nombre debe tener al menos 3 caracteres",
    "name.maxLength": "El campo nombre debe tener como máximo 255 caracteres",
    "email.required": "El campo email es requerido",
    "email.email": "El campo email debe ser un correo válido",
    "email.unique": "El campo email ya se encuentra registrado",
    "responsibility.required": "El campo responsabilidad es requerido",
    "responsibility.minLength":
      "El campo responsabilidad debe tener al menos 3 caracteres",
    "responsibility.maxLength":
      "El campo responsabilidad debe tener como máximo 255 caracteres",
    "salary.required": "El campo salario es requerido",
    "salary.unsigned": "El campo salario debe ser un número positivo",
  };
}
