import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'
import City from './City'
import Chat from './Chat'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public outlet_name: string

  @column()
  public outlet_count: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public address: string

  @column()
  public city_id: number

  @column()
  public image_url: string

  @column()
  public image_thumbnail: string

  @hasOne(() => Admin)
  public admin: HasOne<typeof Admin>

  @belongsTo(() => City, {
    foreignKey: 'city_id'
  })
  public city: BelongsTo<typeof City>

  @hasMany(() => Chat)
  public chat: HasMany<typeof Chat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
