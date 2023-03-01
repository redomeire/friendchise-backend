import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'

export default class ProfilesController {
    public async index({ auth, response }: HttpContextContract) {
        try {
            if (!await auth.use('user').check())
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

            if (user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const foundProfile = await Profile
                .query()
                .where('user_id', user.id)
                .first()

            foundProfile!.address = body.address
            foundProfile!.phone_number = body.phone_number
            foundProfile!.birth_date = body.birth_date
            foundProfile!.job = body.job
            foundProfile!.bio = body.bio
            foundProfile!.gender = body.gender
            foundProfile!.profile_img = body.profile_img

            await foundProfile!.save()

            const data = {
                ...foundProfile?.$attributes,
                username: user.username
            }

            return response.ok({ status: 'success', message: 'success update profile!', data })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }

    public async updateProfilePic({ auth, request, response }: HttpContextContract) {
        const file = request.file('file', {
            size: '500kb',
            extnames: ['jpg', 'png', 'jpeg']
        })

        try {
            const user = auth.use('user').user

            if (user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            if (!file?.isValid)
                return response.badRequest({ status: 'error', code: 500, message: file?.errors })

            const image = await cloudinary.upload(file, file.clientName)

            const foundProfile = await Profile
                .query()
                .where('user_id', user.id)
                .first()

            foundProfile!.profile_img = image.url

            await foundProfile!.save()

            const data = {
                ...foundProfile?.$attributes,
                username: user.username
            }

            return response.ok({ status: 'success', message: 'success update profile!', data: { ...data } })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }

    public async deleteProfilePic({ auth, response }: HttpContextContract){
        try {
            const user = auth.use('user').user

            if(user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const foundProfile = await Profile
            .query()
            .where('user_id', user.id)
            .first()

            await cloudinary.destroy(foundProfile!.profile_img)

            foundProfile!.profile_img = ""
            await foundProfile!.save();


            const data = {
                ...foundProfile?.$attributes,
                username: user.username
            }

            return response.ok({ status: 'success', data: data, message: 'success delete profile picture' })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }
}
