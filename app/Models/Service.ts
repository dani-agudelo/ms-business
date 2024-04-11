import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Headquarter from "./Headquarter";
import Relocation from "./Relocation";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public type: string;

  @column()
  public description: string;

  @column()
  public price: number;

  @column()
  public site_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Relocation, {
    foreignKey: "service_id",
  })
  public relocations: HasMany<typeof Relocation>;

  @belongsTo(() => Headquarter, {
    foreignKey: "headquarter_id",
  })
  public headquarters: BelongsTo<typeof Headquarter>;
}
