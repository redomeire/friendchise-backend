import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Chat from 'App/Models/Chat'
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

            const newChat = new Chat()
            newChat.pembelian_id = newPembelian.id
            await newChat.save()

            return response.ok({ status: 'success', transaction: newPembelian, chat: newChat })
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
}
