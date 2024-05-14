import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Beneficiary from "./Beneficiary";
import Owner from "./Owner";
import ServiceExecution from "./ServiceExecution";
import Subscription from "./Subscription";

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public document: string;

  @column()
  public phone: string;

  @column()
  public gender: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Owner, {
    foreignKey: "customer_id",
  })
  public owners: HasMany<typeof Owner>;

  @hasMany(() => Beneficiary, {
    foreignKey: "customer_id",
  })
  public beneficiaries: HasMany<typeof Beneficiary>;

  @hasMany(() => ServiceExecution, {
    foreignKey: "customer_id",
  })
  public serviceExecutions: HasMany<typeof ServiceExecution>;

  @hasMany(() => Subscription, {
    foreignKey: "customer_id",
  })
  public subscriptions: HasMany<typeof Subscription>;
}
