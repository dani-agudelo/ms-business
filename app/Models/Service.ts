import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Relocation from "./Relocation";
import ServicePlan from "./ServicePlan";
import Customer from "./Customer";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => ServicePlan, {
    foreignKey: "service_id",
  })
  public servicePlans: HasMany<typeof ServicePlan>;

  @hasMany(() => Relocation, {
    foreignKey: "service_id",
  })
  public relocations: HasMany<typeof Relocation>;

  @manyToMany(() => Customer, {
    pivotTable: "service_executions",
    pivotForeignKey: "service_id",
    pivotRelatedForeignKey: "customer_id",
    pivotColumns: ["comment_id", "chat_id"],
  })
  public customers: ManyToMany<typeof Customer>;
}
