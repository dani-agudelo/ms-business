import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    subscription_id: schema.number.optional([
      rules.unique({
        table: "subscriptions",
        column: "id",
        where: { id: this.ctx.request.input("id") },
      }),
    ]),
    customer_id: schema.number([
      rules.required(),
      rules.exists({ table: "customers", column: "id" }),
    ]),
    plan_id: schema.number([
      rules.required(),
      rules.exists({ table: "plans", column: "id" }),
    ]),
    start_date: schema.date(
      {
        format: "yyyy-MM-dd HH:mm:ss",
      },
      [rules.required(), rules.after("today")],
    ),
    end_date: schema.date(
      {
        format: "yyyy-MM-dd HH:mm:ss",
      },
      [rules.afterField("start_date")],
    ),
    monthly_fee: schema.number([rules.required(), rules.range(0, 999999999)]),
    is_paid: schema.boolean(),
  });

  public messages: CustomMessages = {};
}
