import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('outlet_name')
      table.integer('outlet_count')
      table.string('name')
      table.text('description')
      table.bigInteger('price')
      table.text('address')
      table.json('image_url')
      table.string('image_thumbnail')
      table.integer('city_id').unsigned().references('cities.id').onDelete('CASCADE')
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
