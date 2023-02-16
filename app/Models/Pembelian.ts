import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Company from './Company'
import Chat from './Chat'

export default class Pembelian extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public company_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>

  @hasOne(() => Chat)
  public chat: HasOne<typeof Chat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
