import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'
import Pembelian from 'App/Models/Pembelian'

export default class PembeliansController {
    public async create({ auth, request, response }: HttpContextContract){
        const body = request.all()

        try {
            if(!await auth.use('user').check())
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const newPembelian = new Pembelian()
            newPembelian.user_id = body.user_id
            newPembelian.company_id = body.company_id

            await newPembelian.save()

            return response.ok({ status: 'success', data: newPembelian })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

    public async getHistory({ auth, response }: HttpContextContract){
        try {
            if(!await auth.use('user').check())
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const user = auth.use('user').user

            const riwayats = await Company.findBy('user_id', user!.id)

            return response.ok({ status: 'success', data: riwayats })
        } catch (error) {
            return response.badRequest({ status: 'fail', error })
        }
    }

    public async historyDetail({ auth, request, response }: HttpContextContract){
        const query = request.qs()

        try {
            if(!await auth.use('user').check())
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const user = auth.use('user').user

            const historyDetail = await Pembelian
            .query()
            .where('id', query.id)
            .where('user_id', user!.id)

            return response.ok({ status: 'ok', data: historyDetail })
        } catch (error) {
            return response.badRequest({ status: 'fail', error })
        }
    }
}
