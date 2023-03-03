import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Company from 'App/Models/Company'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Company.createMany([
      {
        outlet_name: 'Kebab Kings',
        outlet_count: 1000,
        name: 'PT Kebab Indonesia',
        description: 'Sebuah bisnis franchise makanan cepat saji berbasis produk utama kebab dan telah menjadi spesialis/real kebab di bidangnya, karena terus mengembangkan ragam jenis kebab hingga memiliki banyak variannya',
        price: 15_000_000,
        address: 'Perumahan Indraprasta Residence IP-5 Kepuhkiriman, WARU 61256',
        image_thumbnail: 'https://kebabkingsindonesia.com/wp-content/uploads/2021/03/faviconkk.png',
        image_url: '["https://kebabkingsindonesia.com/wp-content/uploads/2021/03/slide-booth-kebabkings.png", "https://d1sag4ddilekf6.azureedge.net/compressed/merchants/6-CY5FRP3VRCLTC6/hero/f476d27d46954daa8faa4d00b4dda53f_1578993341098001074.jpeg", "https://images.tokopedia.net/img/cache/500-square/product-1/2017/5/29/436021/436021_cc0875cd-2935-461a-aa33-570c20c600b7.jpg"]',
        city_id: 8
      },
      {
        outlet_name: 'Wisco Chocolate',
        outlet_count: 1000,
        name: 'Koes Island Group',
        description: 'Wisco adalah waralaba minuman yang banyaknya di sukai para kalangan anak muda. Wisco adalah usaha franchise yang mudah dan tidak ribet untuk di urus dan hanya memerlukan modal kecil, oleh sebab itu sangat menguntunkan untuk para mitra apalagi di tambah dengan brend/merk yang sudah terkenal.',
        price: 5_000_000,
        address: 'JL Bintan, No. 1 RT 01 RW 01, Grogolan Kulon, Ketelan, Banjarsari, Solo, Jawa Tengah, Indonesia',
        image_thumbnail: 'https://cf.shopee.co.id/file/f7e7fd1dc74e619c427a3fa6fadec06a',
        image_url: '["https://res.cloudinary.com/dzkqm21et/image/upload/v1677831548/wisco-1_ffxkqu.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831537/wisco-2_e5ocjd.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831540/wisco-3_nnx7mi.png"]',
        city_id: 9
      },
      {
        outlet_name: 'ROPI: Roti Kopi',
        outlet_count: 80,
        name: 'PT Juara Roti Indonesia',
        description: 'ROTI ROPI adalah kudapan dengan topping Kopi yang renyah bercita rasa Mexico Salah satu keunikan ROPI memiliki 7 rasa pilihan yang disukai oleh pelanggan dari berbagai kalangan Bagi pelanggan yang tidak menyukai aroma kopi kami menyediakan topping dengan aroma susu pandan dan kurma.',
        price: 150_000_000,
        address: 'Jl Lkr Delanggu Krecek Kec Delangg Kabupaten Klaten Jawa Tengah 57471',
        image_thumbnail: 'https://rotiropi.com/wp-content/uploads/elementor/thumbs/LOGO-ROPI-ROTI-DAN-KOPI-01-01-puqzeu1zlelbvzwdmbpbogbmo5uo1mbt33s94lch88.png',
        image_url: '["https://res.cloudinary.com/dzkqm21et/image/upload/v1677831529/ropi-1_dgmcz9.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831529/ropi-2_uppsm3.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831528/ropi-3_jyyd8h.png"]',
        city_id: 10
      },
      {
        outlet_name: 'XIOBOBA Indonesia',
        outlet_count: 1000,
        name: 'Doyan Group',
        description: 'Doyan Group adalah perusahaan yang bergerak di manajemen food and beverage franchising. Tentunya dengan semangat kerja dan pelayanan handal oleh tenaga profesional kami yang sudah berpengalaman di bidangnya mampu memberikan solusi dan kontribusi kepada Anda.',
        price: 3_900_000,
        address: 'Jl. Tandes Kidul I No. 16 Kel. Tandes, Kec. Tandes Kota Surabaya, Indonesia',
        image_thumbnail: 'https://www.waralabaku.com/logo/logo_franchise_peluang_usaha_xioboba_indonesia.jpg',
        image_url: '["https://res.cloudinary.com/dzkqm21et/image/upload/v1677831549/xioboba-1_qs8gqn.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831536/xioboba-2_tevv3s.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831536/xioboba-3_n4owik.png"]',
        city_id: 1
      },
      {
        outlet_name: 'Yasaka Chicken',
        outlet_count: 1800,
        name: 'PT Cipta Aneka Selera',
        description: 'PT. Cipta Aneka Selera (CAS Group) adalah suatu perusahaan kuliner yang memiliki konsep multi-brand yang didirikan sejak tahun 2011 dengan misi menyediakan variasi makanan dan minuman lezat berkualitas dengan harga terjangkau untuk konsumen seluruh Indonesia.',
        price: 9_500_000,
        address: 'Grha Praba Samanta Gd Japfa 2, Daan Mogot KM 12 no.9, Jakarta Barat 11730',
        image_thumbnail: 'https://www.casindo.co.id/wp-content/uploads/2022/04/Yasaka-logo-rev-new-07.svg',
        image_url: '["https://res.cloudinary.com/dzkqm21et/image/upload/v1677831555/yasaka-1_c5x17p.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831553/yasaka-2_t7op9x.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831544/yasaka-3_djnbx2.png"]',
        city_id: 11
      },
      {
        outlet_name: 'Orchi',
        outlet_count: 1500,
        name: 'Orchi Indonesia Group',
        description: 'Orchi Chicken (Original Fried Chicken) berkiprah di Industri Fried Chicken sejak 2007 dan Mulai Kemitraan sejak 2009, konsisten hingga saat ini dan Dalam Keterlibatannya di Industri Fried Chicken Tanah Air Semakin Menguatkan Eksistensinya.Orchi Fried Chicken Telah 9 Tahun mengibarkan semangat Orchi ke seluruh pelosok tanah air Indonesia dan banyak membantu menjadikan pengusaha-pengusaha baru yang mandiri.',
        price: 13_750_000,
        address: 'JL Raya Pulogebang No 43, Jakarta Timur',
        image_thumbnail: 'http://cdn.shopify.com/s/files/1/0266/2619/5514/collections/anggraeni-rahmasari-chandra-permana-putra-orchi-geprek--fried-chicken-1574212827.jpg?v=1599125740',
        image_url: '["https://res.cloudinary.com/dzkqm21et/image/upload/v1677831545/orchi-1_dtrwd5.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831516/orchi-2_i3euxl.png", "https://res.cloudinary.com/dzkqm21et/image/upload/v1677831533/orchi-3_rct4fv.png"]',
        city_id: 12
      },
    ])
  }
}
