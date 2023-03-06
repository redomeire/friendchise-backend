import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Company from 'App/Models/Company'
import Pembelian from 'App/Models/Pembelian'

export default class PembeliansController {
    public async create({ auth, request, response }: HttpContextContract) {
        const body = request.all()

        try {
            const user = auth.use('user').user

            if (user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const foundCompany = await Company.findBy('id', body.company_id)

            if (foundCompany === null)
                return response.notFound({ status: 'fail', message: 'company not found' })

            const newPembelian = new Pembelian()
            newPembelian.user_id = user.id
            newPembelian.company_id = body.company_id
            newPembelian.tipe_usaha = body.tipe_usaha
            newPembelian.planning_operation = body.planning_operation
            newPembelian.pengalaman_usaha = body.pengalaman_usaha
            newPembelian.lokasi_usaha = body.lokasi_usaha
            newPembelian.service_price = body.service_price
            newPembelian.total_price = foundCompany.price.toString()
            newPembelian.status = body.status

            await newPembelian.save()

            const foundFranchise = await Company.findBy('id', body.company_id)

            foundFranchise!.outlet_count -= 1

            await foundFranchise?.save()

            return response.ok({ status: 'success', data: newPembelian })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

    public async getHistory({ auth, response }: HttpContextContract) {

        try {
            const user = auth.use('user').user

            if (user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            let riwayats: Pembelian[];

            riwayats = await Database
                .from('pembelians')
                .join('companies', 'companies.id', '=', 'pembelians.company_id')
                .join('users', 'users.id', '=', 'pembelians.user_id')
                .select('pembelians.*')
                .select('companies.image_thumbnail')
                .select('companies.outlet_name')
                .select('companies.name')
                .where('users.id', user.id)

            return response.ok({ status: 'success', data: riwayats })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }

    public async historyDetail({ auth, request, response }: HttpContextContract) {
        const query = request.qs()

        try {
            if (!await auth.use('user').check())
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const user = auth.use('user').user

            const historyDetail = await Pembelian
                .query()
                .where('id', query.id)
                .where('user_id', user!.id)

            const messages = await Database
                .query()
                .from('messages')
                .join('chats', 'messages.chat_id', '=', 'chats.id')
                .join('pembelians', 'chats.pembelian_id', '=', 'pembelians.id')

            return response.ok({ status: 'ok', data: historyDetail, messages: messages })
        } catch (error) {
            return response.badRequest({ status: 'fail', error })
        }
    }

    public async changeStatus({ auth, request, response }: HttpContextContract) {
        const body = request.only(['status', 'id'])

        try {
            const user = auth.use('user').user

            if (user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const foundPembelian = await Pembelian
                .query()
                .where('id', body.id)
                .where('user_id', user.id)
                .first()

            if (foundPembelian === null)
                return response.notFound({ status: 'fail', message: 'transaction not found' })

            foundPembelian.status = body.status

            await foundPembelian.save()

            return response.ok({ status: 'ok', data: foundPembelian })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }
}
