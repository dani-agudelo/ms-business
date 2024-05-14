import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Customer from "./Customer";
import Owner from "./Owner";

export default class Beneficiary extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public customer_id: number;

  @column()
  public owner_id: number;

  @column()
  public age: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Customer, {
    foreignKey: "customer_id",
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Owner, {
    foreignKey: "owner_id",
  })
  public Owner: BelongsTo<typeof Owner>;
}
