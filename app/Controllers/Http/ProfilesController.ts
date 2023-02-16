import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
    public async index({ auth, response }: HttpContextContract){
        try {
            if(!await auth.use('user').check())
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const user = auth.use('user').user

            const profile = await Profile.findBy('id', user?.id)

            return response.ok({ status: 'success', data: profile })
        } catch (error) {
            return response.badRequest({ status: 'fail', error })
        }
    }
}
