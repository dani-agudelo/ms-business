import { DateTime } from "luxon";
import {
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Comment from "./Comment";
import Chat from "./Chat";
import Customer from "./Customer";
import Service from "./Service";
import Headquarter from "./Headquarter";

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public customer_id: number;

  @column()
  public service_id: number;

  @column()
  public unique_code: string

  @column()
  public headquarter_id: number | null 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Customer, {
    foreignKey: "customer_id",
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Service, {
    foreignKey: "service_id",
  })
  public service: BelongsTo<typeof Service>;

  @belongsTo(() => Headquarter, {
    foreignKey: "headquarter_id",
  })
  public headquarter: BelongsTo<typeof Headquarter>;

  @hasMany(() => Comment, {
    foreignKey: "service_execution_id",
  })
  public comments: HasMany<typeof Comment>;

  @hasOne(() => Chat, {
    foreignKey: "service_execution_id",
  })
  public chat: HasOne<typeof Chat>;

  @beforeSave()
  public static async generateUniqueCode(serviceExecution: ServiceExecution) {
    if (!serviceExecution.$dirty.unique_code) {
      serviceExecution.unique_code = DateTime.now().toFormat('yyyyMMddHHmmss') + Math.floor(Math.random() * 1000)
    }
  }
}
