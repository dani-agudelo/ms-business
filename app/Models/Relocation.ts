import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

}
