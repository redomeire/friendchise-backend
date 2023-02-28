import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Company from './Company'

export default class Pembelian extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public company_id: number

  @column()
  public tipe_usaha: ['milik sendiri', 'sewa']

  @column()
  public planning_operation: ['dikelola sendiri', 'dikelola orang lain']

  @column()
  public pengalaman_usaha: boolean

  @column()
  public lokasi_usaha: string

  @column()
  public service_price: string
 
  @column()
  public total_price: string

  @column()
  public status: ['berlangsung', 'berhasil', 'gagal']

  @belongsTo(() => User, {
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Company, {
    foreignKey: 'company_id'
  })
  public company: BelongsTo<typeof Company>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
