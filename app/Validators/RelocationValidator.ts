import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RelocationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    relocation_id: schema.number.optional([
      rules.unique({
        table: "relocations",
        column: "id",
      }),
    ]),
    origin: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    destination: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    date: schema.date(
      {
        format: "yyyy-MM-dd",
      },
      [rules.required(), rules.after("today")],
    ),
    price: schema.number([rules.required(), rules.unsigned()]),
    is_available: schema.boolean(),

    service_id: schema.number([
      rules.required(),
      rules.exists({ table: "services", column: "id" }),
      rules.unique({ table: "relocations", column: "service_id" }),
    // service_id no puede pertenecer a cremations ni sepultures
    
    
      
    ]),
  });

  public messages: CustomMessages = {
    "origin.required": "El origen es requerido",
    "origin.minLength": "El origen debe tener al menos 3 caracteres",
    "origin.maxLength": "El origen debe tener menos de 255 caracteres",
    "destination.required": "El destino es requerido",
    "destination.minLength": "El destino debe tener al menos 3 caracteres",
    "destination.maxLength": "El destino debe tener menos de 255 caracteres",
    "date.required": "La fecha es requerida",
    "date.after": "La fecha debe ser posterior a hoy",
    "price.required": "El precio es requerido",
    "price.unsigned": "El precio debe ser un número positivo",
    "is_available.required": "La disponibilidad es requerida",
    "service_id.required": "El servicio es requerido",
    "service_id.exists": "El servicio no existe",
  };
}
