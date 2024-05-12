import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Room from "./Room";

export default class Headquarter extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public adress: string;

  @column()
  public city: string;

  @column()
  public phone: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Room, {
    foreignKey: "headquarter_id",
  })
  public rooms: HasMany<typeof Room>;
  
}
