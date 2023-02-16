import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import City from 'App/Models/City'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await City.createMany([
      {
        name: 'Surabaya'
      },
      {
        name: 'Medan'
      },
      {
        name: 'Yogyakarta'
      },
      {
        name: 'Semarang'
      },
      {
        name: 'Bandung'
      },
      {
        name: 'Jakarta'
      },
      {
        name: 'Serang'
      },
      {
        name: 'Mojokerto'
      },
    ])
  }
}
