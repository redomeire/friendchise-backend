import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SavedCompany from 'App/Models/SavedCompany'

export default class UsersController {
    public async saveFranchise({ auth, request, response }: HttpContextContract){
        const body = request.only(['company_id'])

        try {
            const user = auth.use('user').user

            if(user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const savedCompany = new SavedCompany()
            savedCompany.user_id = user.id
            savedCompany.company_id = body.company_id

            await savedCompany.save()

            return response.ok({ status: 'success', data: savedCompany, message: 'success saving company!' })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }
}
