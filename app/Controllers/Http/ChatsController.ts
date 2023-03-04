import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';
import Message from 'App/Models/Message';
import Ws from 'App/Services/Ws';

export default class ChatsController {
    async createChatRoom({ auth, request, response }: HttpContextContract) {
        const body = request.only(['company_id'])

        try {
            const user = auth.use('user').user

            if (user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const foundChatRoom = await Chat
                .query()
                .where('company_id', body.company_id)
                .where('user_id', user.id)
                .first()

            if (foundChatRoom === null) {

                const newChatRoom = new Chat()
                newChatRoom.company_id = body.company_id
                newChatRoom.user_id = user.id

                await newChatRoom.save()
                // Ws.io.emit('client:room', { isOpen: true })
                Ws.io.emit('client:room:' + newChatRoom.id, { isOpen: true })
                return response.ok({ status: 'success', data: newChatRoom })
            }

            Ws.io.emit('client:room:' + foundChatRoom.id, { isOpen: true, id: foundChatRoom.id })
            return response.ok({ status: 'success', data: foundChatRoom })

        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }
    
    async getMessages({ auth, request, response }: HttpContextContract) {
        const body = request.params()        

        try {
            const user = auth.use('user').user;

            if(user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const foundMessages = await Message
            .query()
            .join('chats', 'chats.id', '=', 'messages.chat_id')
            .join('users', 'chats.user_id', '=', 'users.id')
            .where('chat_id', body.chat_id)
            .where('users.id', user.id)

            return response.ok({ status: 'success', data: foundMessages })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }

    async storeMessage({ auth, request, response }: HttpContextContract) {
        const body = request.only(['chat_id', 'text_message', 'sent_by_user'])

        try {
            const user = auth.use('user').user || auth.use('admin').user;

            if (user === undefined)
                return response.unauthorized({ status: 'error', message: 'unauthorized operation' })

            const newMessage = new Message();

            newMessage.chat_id = body.chat_id;
            newMessage.text_message = body.text_message;
            newMessage.sent_by_user = body.sent_by_user;
            await newMessage.save();

            Ws.io.socketsJoin("room:" + body.chat_id);

            Ws.io.to("room:" + body.chat_id).emit('client:chat:' + body.chat_id, {
                id: newMessage.id,
                chat_id: body.chat_id,
                text_message: body.text_message,
                sent_by_user: body.sent_by_user,
                created_at: newMessage.createdAt
            })
            return { status: 'success', code: 200, data: newMessage }
        } catch (error) {
            return { status: 'error', code: 500, message: error.message }
        }
    }


    async deleteMessage({ auth, request, response }: HttpContextContract) {
        const body = request.only(['id']);

        try {
            const user = auth.use('admin').user || auth.use('user').user;
            const foundMessage = await Message
                .query()
                .where('id', body.id)
                .first();

            if (user === undefined)
                return response.unauthorized({ message: 'operation not permitted' })

            if (foundMessage !== null) {
                await foundMessage.delete();

                Ws.io.socketsJoin(`message:${body.id}`)

                console.log('message deleted');

                Ws.io.to(`message:${body.id}`).emit(`msg:delete:${body.id}`, { id: body.id })
                return response.ok({ status: 'success', data: foundMessage })
            }

        } catch (error) {
            return response.internalServerError({ status: 'error', code: 500, message: error.message })
        }
    }
}
