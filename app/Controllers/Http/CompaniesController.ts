import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompaniesController {
    
    // make city controller first
    public async create({ request }: HttpContextContract){
        const body = request.all()

        return body
    }
}
