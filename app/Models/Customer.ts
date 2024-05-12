import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Beneficiary from "./Beneficiary";
import Holder from "./Holder";
import Service from "./Service";

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

  @manyToMany(() => Service, {
    pivotTable: "service_executions",
    pivotForeignKey: "customer_id",
    pivotRelatedForeignKey: "service_id",
    pivotColumns: ["comment_id", "chat_id"],
  })
  public services: ManyToMany<typeof Service>;
}
