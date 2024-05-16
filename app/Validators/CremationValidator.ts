import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cremation_id: schema.number.optional([
      rules.unique({
        table: "cremations",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    service_id: schema.number([
      rules.exists({ table: "services", column: "id" }),
      rules.unique({ table: "cremations", column: "service_id" }),
      rules.required(),
    ]),
    room_id: schema.number([
      rules.exists({ table: "rooms", column: "id" }),
      rules.required(),
    ]),
    location: schema.string([
      rules.unique({
        table: "cremations",
        column: "location",
        caseInsensitive: true,
      }),
    ]),
    date: schema.date({ format: "yyyy-MM-dd HH:mm" }, [rules.required()]),
    price: schema.number([rules.required()]),
    is_available: schema.boolean([rules.required()]),
  });

  public messages: CustomMessages = {
    "service_id.required": "El campo service_id es requerido",
    "service_id.exists": "El campo service_id no existe en la tabla services",
    "room_id.required": "El campo room_id es requerido",
    "room_id.exists": "El campo room_id no existe en la tabla rooms",
    "location.unique": "El campo location ya está en uso",
    "date.required": "El campo date es requerido",
    "price.required": "El campo price es requerido",
    "is_available.required": "El campo is_available es requerido",
    "service_id.unique": "El campo service_id ya está en uso",
  };
}
