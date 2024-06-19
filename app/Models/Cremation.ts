import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";
import Room from "./Room";

export default class Cremation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime()
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
  public service: BelongsTo<typeof Service>;

}
