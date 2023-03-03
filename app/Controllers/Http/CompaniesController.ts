import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import City from 'App/Models/City'
import Company from 'App/Models/Company'

export default class CompaniesController {

    public async index({ auth, response }: HttpContextContract) {
        try {
            if (!await auth.use('user').check())
                return response.unauthorized({ status: 'fail', message: 'Unauthorized operation' })

            const companies = await Company.all()

            return response.ok({ status: 'success', data: companies })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }

    public async search({ auth, request, response }: HttpContextContract) {
        const queries = request.qs();

        try {
            const user = auth.use('user').user

            if (user === undefined)
                return response.unauthorized({ status: 'fail', error: { 0: 'unauthorized operation' } })

            let searchedCompany: Company[];

            if (queries.city_id === '') {
                searchedCompany = await Database
                    .from('companies')
                    .leftJoin('saved_companies', (join) => {
                        join.on('companies.id', '=', 'saved_companies.company_id')
                            .andOnVal('saved_companies.user_id', '=', user.id)
                    })
                    .where('companies.outlet_name', 'like', `%${queries.name}%`)
                    .select('companies.*')
                    .select('saved_companies.saved as saved')
                    .select('saved_companies.id as savedCompanyId')
            } else {
                searchedCompany = await Database
                    .from('companies')
                    .leftJoin('saved_companies', (join) => {
                        join.on('companies.id', '=', 'saved_companies.company_id')
                            .andOnVal('saved_companies.user_id', '=', user.id)
                    })
                    .select('companies.*')
                    .select('saved_companies.saved as saved')
                    .select('saved_companies.id as savedCompanyId')
                    .where('outlet_name', 'like', `%${queries.name}%`)
                    .andWhere('city_id', queries.city_id)
            }

            return response.ok({ status: 'success', data: searchedCompany })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error: error.message })
        }
    }

    public async detail({ auth, request, response }: HttpContextContract) {
        const body = request.params();

        try {
            const user = auth.use('user').user
            if (user === undefined)
                return response.unauthorized({ status: "fail", message: "unauthorized operation" })

                const companyDetail = await Database
                    .from('companies')
                    .leftJoin('saved_companies', (join) => {
                        join.on('companies.id', '=', 'saved_companies.company_id')
                            .andOnVal('saved_companies.user_id', '=', user.id)
                    })
                    .select('companies.*')
                    .select('saved_companies.saved as saved')
                    .select('saved_companies.id as savedCompanyId')
                    .where('companies.id', body.id)
                    .first()

            const foundCity = await City.findBy('id', companyDetail?.city_id)

            return response.ok({ status: 'success', data: { ...companyDetail, city_name: foundCity?.name } })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }
}
