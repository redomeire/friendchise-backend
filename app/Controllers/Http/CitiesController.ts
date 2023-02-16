import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City';

export default class CitiesController {
    public async create({ auth, request, response }: HttpContextContract){
        const body = request.all();

        try {
            if(!await auth.use('admin').check())
                return response.unauthorized({ status: 'fail', message: 'unauthorized operation' })

            const newCity = new City();
            newCity.name = body.name

            await newCity.save()

            return response.ok({ status: 'success', data: newCity })
        } catch (error) {
            return response.internalServerError({ status: 'fail', error })
        }
    }
}
