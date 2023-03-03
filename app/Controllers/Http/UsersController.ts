import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
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
            savedCompany.saved = true

            await savedCompany.save()

            return response.ok({ status: 'success', data: savedCompany, message: 'success saving company!' })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }

    public async removeFranchise({ auth, request, response }: HttpContextContract){
        const body = request.only(['id']);

        try {
            const user = auth.use('user').user;

            if(user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const foundSavedFranchise = await SavedCompany
            .query()
            .where('id', body.id)
            .where('user_id', user.id)
            .first()

            await foundSavedFranchise?.delete()

            return response.ok({ status: 'success', data: foundSavedFranchise, message: 'success remove franchise' })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }

    public async getSavedCompanies({ auth, response }: HttpContextContract){
        try {
            const user = auth.use('user').user

            if(user === undefined)
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })
            
            const savedCompany = await Database
            .from('saved_companies')
            .join('companies', 'companies.id', '=', 'saved_companies.company_id')
            .select('companies.*')
            .select('saved_companies.saved as saved')
            .select('saved_companies.id as savedCompanyId')
            .where('saved_companies.user_id', user.id)


            return response.ok({ status: 'success', data: savedCompany })
        } catch (error) {
            return response.badRequest({ status: 'fail', message: error.message })
        }
    }
}
