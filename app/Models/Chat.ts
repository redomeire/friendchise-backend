import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pembelian from './Pembelian'
import Message from './Message'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pembelian_id: number

  @belongsTo(() => Pembelian, {
    foreignKey: 'pembelian_id'
  })
  public pembelian: BelongsTo<typeof Pembelian>

  @hasMany(() => Message)
  public message: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
