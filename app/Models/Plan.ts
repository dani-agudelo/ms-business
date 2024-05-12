import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServicePlan from './ServicePlan'
import Subscription from './Subscription'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public typePlan: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ServicePlan, {
    foreignKey: 'plan_id'
  })
  public servicePlans: HasMany<typeof ServicePlan>

  @hasMany(() => Subscription, {
    foreignKey: "plan_id",
  })
  public subscriptions: HasMany<typeof Subscription>;
}
