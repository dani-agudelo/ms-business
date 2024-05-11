import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sepulture extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sepulture_name: string

  @column()
  public description: string
 
  @column()
  public cemetery_name: string

  @column()
  public sepulture_type: string

  @column()
  public price: number

  @column()
  public is_available: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
