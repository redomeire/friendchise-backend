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

    public async update({ auth, request, response }: HttpContextContract) {
        const body = request.all();

        try {
            const user = auth.use('user').user

            if(user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const foundProfile = await Profile
            .query()
            .where('user_id', user.id)
            .first()

            foundProfile!.address = body.address
            foundProfile!.phone_number = body.phone_number
            foundProfile!.birth_date = body.birth_date
            foundProfile!.job = body.job
            foundProfile!.gender = body.gender
            foundProfile!.profile_img = body.profile_img

            await foundProfile!.save()

            return response.ok({ status: 'success', message: 'success update profile!', data: foundProfile })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }

    public async updateProfilePic({ auth, request, response }: HttpContextContract) {
        const body = request.only(['profile_img']);

        try {
            const user = auth.use('user').user

            if(user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const foundProfile = await Profile
            .query()
            .where('user_id', user.id)
            .first()

            foundProfile!.profile_img = body.profile_img

            await foundProfile!.save()

            return response.ok({ status: 'success', message: 'success update profile!', data: foundProfile })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }
}
