import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Category.createMany([
      {
        name: 'Makanan Cepat Saji'
      },
      {
        name: 'Minuman'
      },
      {
        name: 'Outlet/Restoran'
      },
      {
        name: '1-3 jt'
      },
      {
        name: '3-5 jt'
      },
      {
        name: '6-10 jt'
      },
      {
        name: '> 10 jt'
      }
    ])
  }
}
