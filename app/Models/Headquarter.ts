import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";

export default class Headquarter extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public direction: string;

  @column()
  public city: string;

  @column()
  public phone: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Service, {
    foreignKey: "headquarter_id",
  })
  public services: HasMany<typeof Service>;
}
