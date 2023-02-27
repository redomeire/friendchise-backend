import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pembelians'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('company_id').unsigned().references('companies.id').onDelete('CASCADE')
      table.enu('tipe_usaha', ['milik sendiri', 'sewa'])
      table.enu('planning_operation', ['dikelola sendiri', 'dikelola orang lain'])
      table.boolean('pengalaman_usaha')
      table.text('lokasi_usaha')
      table.text('service_price')
      table.text('total_price')
      table.enu('status', ['berlangsung', 'berhasil', 'gagal'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
