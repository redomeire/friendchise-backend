import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile';
import User from 'App/Models/User'

export default class AuthController {
    public async register({ request, response }: HttpContextContract){
        const body = request.only(['email','password', 'name', 'phone', 'repeat_password', 'username'])
        try {
            const foundUser = await User.findBy('email', body.email);

            if(foundUser !== null) 
                return response.forbidden({ status: 'fail', message: 'username or email has been used' })

            if(body.password !== body.repeat_password)
                return response.badRequest({ status: 'fail', message: 'password and repeat password must be same' })

            const newUser = new User();
            newUser.username = body.username
            newUser.email = body.email
            newUser.password = body.password
            await newUser.save()
            
            const newProfile = new Profile();
            newProfile.user_id = newUser.id
            newProfile.name = body.name
            await newProfile.save()

            return response.ok({ status: 'success', message: 'success creating new user', data: { user: newUser, profile: newProfile } })

        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

    public async login({ auth, request, response }: HttpContextContract){
        const body = request.only(['email', 'password']);

        try {
            const token = await auth.use('user').attempt(body.email, body.password)
            const profile = await Profile.findBy('user_id', token.user.id);

            const data = {
                token,
                profile: {
                    ...profile?.$attributes,
                    username: token.user.username
                }
            }

            return response.ok({ status: 'success', data })
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
