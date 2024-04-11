import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sepulture from 'App/Models/Sepulture';

export default class SepulturesController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSepulture: Sepulture = await Sepulture.findOrFail(params.id);
            return theSepulture;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Sepulture.query().paginate(page, perPage)
            } else {
                return await Sepulture.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theSepulture: Sepulture = await Sepulture.create(body);
        return theSepulture;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSepulture: Sepulture = await Sepulture.findOrFail(params.id);
        const body = request.body();
        theSepulture.sepulture_name = body.sepulture_name;
        theSepulture.description = body.description;
        theSepulture.is_available = body.is_available;
        return await theSepulture.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSepulture: Sepulture = await Sepulture.findOrFail(params.id);
        response.status(204);
        return await theSepulture.delete();
    }

}