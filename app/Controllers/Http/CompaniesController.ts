import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'

export default class CompaniesController {
    
    public async index({ auth, response }: HttpContextContract){
        try {
            if(!await auth.use('user').check())
                return response.unauthorized({ status: 'fail', message: 'Unauthorized operation' })

            const companies = await Company.all()

            return response.ok({ status: 'success', data: companies })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

    public async search({ auth, request, response }: HttpContextContract){
        const query = request.qs();

        try {
            if(!await auth.use('user').check())
                return response.unauthorized({ status: 'fail', error: { 0: 'unauthorized operation' } })

            const searchedCompany = await Company
            .query()
            .where('name', 'like', query.name)
            .orWhere('city_id', query.city_id)

            return response.ok({ status: 'success', data: searchedCompany })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

    public async detail({ auth, request, response }: HttpContextContract){
        const body = request.params();

        try {
            if(!await auth.use('user').check())
                return response.unauthorized({ status: "fail", message: "unauthorized operation"})

            const companyDetail = await Company.findBy('id', body.id)

            return response.ok({ status: 'success', data: companyDetail })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }
}
