import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Relocation from "./Relocation";
import ServicePlan from "./ServicePlan";
import Sepulture from "./Sepulture";
import Cremation from "./Cremation";
import ServiceExecution from "./ServiceExecution";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name_service: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => ServicePlan, {
    foreignKey: "service_id",
  })
  public servicePlans: HasMany<typeof ServicePlan>;

  // Relationships with Relocation, which is a child of Service
  @hasMany(() => Relocation, {
    foreignKey: "service_id",
  })
  public relocations: HasMany<typeof Relocation>;

  //Relationships with Sepulture, which is a child of Service
  @hasMany(() => Sepulture, {
    foreignKey: "service_id",
  })
  public sepultures: HasMany<typeof Sepulture>;

  //Relationships with Cremation, which is a child of Service
  @hasMany(() => Cremation, {
    foreignKey: "service_id",
  })
  public cremations: HasMany<typeof Cremation>;

  @hasMany(() => ServiceExecution, {
    foreignKey: "service_id",
  })
  public serviceExecutions: HasMany<typeof ServiceExecution>;
}
