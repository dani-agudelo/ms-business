import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Beneficiary from "./Beneficiary";
import Holder from "./Holder";
import ServiceExecution from "./ServiceExecution";

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Holder, {
    foreignKey: "customer_id",
  })
  public holders: HasMany<typeof Holder>;

  @hasMany(() => Beneficiary, {
    foreignKey: "customer_id",
  })
  public beneficiaries: HasMany<typeof Beneficiary>;

  @hasMany(() => ServiceExecution, {
    foreignKey: "customer_id",
  })
  public serviceExecutions: HasMany<typeof ServiceExecution>;

  // relationship with plans (la intermedia)
}
