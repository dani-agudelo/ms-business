import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Customer from "./Customer";
import Plan from "./Plan";
import Payment from "./Payment";

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public customer_id: number;

  @column()
  public plan_id: number;

  @column.dateTime()
  public startDate: DateTime;

  @column.dateTime()
  public endDate: DateTime;

  @column()
  public monthlyFee: number;

  @column()
  public isPaid: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Customer, {
    foreignKey: "customer_id",
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Plan, {
    foreignKey: "plan_id",
  })
  public plan: BelongsTo<typeof Plan>;

  @hasMany(() => Payment, {
    foreignKey: "subscription_id",
  })
  public payments: HasMany<typeof Payment>;
}
