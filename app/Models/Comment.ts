import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string
  
  @column()
  public rating: number

  @column()
  public comment: string

  @column()
  public service_execution_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relationships
  @belongsTo(() => ServiceExecution, {
    foreignKey: 'service_execution_id',
  })
  public serviceExecution: BelongsTo<typeof ServiceExecution>
}
