import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import ServiceExecution from './ServiceExecution'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: boolean

  @column()
  public service_execution_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Message, {
    foreignKey: 'chat_id',
  })
  public messages: HasMany<typeof Message>

  @belongsTo(() => ServiceExecution, {
    foreignKey: 'service_execution_id',
  })
  public serviceExecution: BelongsTo<typeof ServiceExecution>
}
