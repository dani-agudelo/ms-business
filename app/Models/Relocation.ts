import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";

export default class Relocation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public origin: string;

  @column()
  public destination: string;

  @column.dateTime({ autoCreate: true })
  public date: DateTime;

  @column()
  public price: number;

  @column()
  public service_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Service, {
    foreignKey: "service_id",
  })
  public services: BelongsTo<typeof Service>;
}
