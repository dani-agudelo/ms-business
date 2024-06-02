import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customer_id: schema.number.optional([
      rules.unique({
        table: "customers",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    user_id: schema.string.optional([
      rules.unique({ table: "customers", column: "user_id" }),
    ]),
    name: schema.string(),
    email: schema.string([rules.email()]),
    document: schema.string([
      rules.unique({ table: "customers", column: "document" }),
    ]),
    phone: schema.string([rules.mobile({ locale: ["es-CO"] })]),
    gender: schema.string([rules.regex(/^(M|F|O)$/)]),
  });
  public messages: CustomMessages = {
    "name.required": "El campo name es requerido",
    "email.required": "El campo email es requerido",
    "email.email": "El campo email debe ser un correo válido",
    "document.required": "El campo document es requerido",
    "document.unique": "El campo document ya existe en la tabla customers",
    "phone.required": "El campo phone es requerido",
    "phone.mobile": "El campo phone debe ser un número de teléfono válido",
  };
}
