import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Plan from './Plan'

export default class ServicePlan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_id: number

  @column()
  public plan_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships
  @belongsTo(() => Service, {
    foreignKey: 'service_id',
  })
  public service: BelongsTo<typeof Service>

  // Relationships
  @belongsTo(() => Plan, {
    foreignKey: 'plan_id',
  })
  public plan: BelongsTo<typeof Plan>
}
