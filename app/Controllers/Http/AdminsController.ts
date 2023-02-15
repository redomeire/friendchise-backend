import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin';

export default class AdminsController {
    public async register({ request, response }: HttpContextContract){
        const body = request.all();

        try {
            const newAdmin = new Admin();
            newAdmin.name = body.name
            newAdmin.email = body.email
            newAdmin.username = body.username
            newAdmin.password = body.password
            newAdmin.gender = body.gender
            newAdmin.birth_date = body.birth_date
            newAdmin.company_id = body.company_id

            await newAdmin.save()

            return response.ok({ status: 'success', data: newAdmin })

        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

    public async login({ auth, request, response }: HttpContextContract){
        const body = request.only(['username', 'password']);

        try {
            const admin = auth.use('admin').user

            if(admin !== undefined) 
                return response.badRequest({ status: 'fail', message: 'you need to logout first' })

            const token = await auth.use('admin').attempt(body.username, body.password) 

            return response.ok({ status: 'success', data: token })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

    public async logout({ auth, response }: HttpContextContract){
        try {
            const foundAdmin = auth.use('admin').user

            if(foundAdmin === undefined)
                return response.unauthorized({ status: 'fail', message: 'Unauthorized access' })

            await auth.use('admin').revoke()

            return response.ok({ status: 'success logout', message: 'successfull logout' })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

}
