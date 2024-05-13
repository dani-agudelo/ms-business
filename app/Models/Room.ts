import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Headquarter from './Headquarter'
import Sepulture from './Sepulture'
import Cremation from './Cremation'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public room_name: string

  @column()
  public room_capacity: number

  @column()
  public facilities: string

  @column()
  public is_available: boolean

  @column()
  public headquarter_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Headquarter, {
    foreignKey: 'headquarter_id'
  })
  public headquarter: BelongsTo<typeof Headquarter>

  @hasMany(() => Sepulture, {
    foreignKey: 'room_id',
  })
  public sepultures: HasMany<typeof Sepulture>

  @hasMany(() => Cremation, {
    foreignKey: 'room_id',
  })
  public cremations: HasMany<typeof Cremation>
}
