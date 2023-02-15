import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async register({ request, response }: HttpContextContract){
        const body = request.only(['email', 'username', 'password'])
        try {
            const foundUser = await User.findBy('username', body.username);

            if(foundUser !== null) return response.forbidden({ status: 'fail', message: 'username or email has been used' })

            const newUser = new User();
            newUser.username = body.username
            newUser.email = body.email
            newUser.password = body.password

            await newUser.save()

            return response.ok({ status: 'success', message: 'success creating new user', data: newUser })

        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

    public async login({ auth, request, response }: HttpContextContract){
        const body = request.only(['username', 'password']);

        try {
            const token = await auth.use('user').attempt(body.username, body.password)
            return response.ok({ status: 'success', data: token })
        } catch (error) {
            return response.internalServerError({ status: 'fail',  error})
        }
    }

    public async logout({ auth, response }: HttpContextContract){
        try {
            const foundUser = auth.use('user').user

            if(foundUser === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized access' })

            await auth.use('user').revoke()

            return response.ok({ status: 'success', message: 'success logout', data: foundUser })

        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }
}