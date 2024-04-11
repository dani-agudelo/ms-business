import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Region from 'App/Models/Region';

export default class RegionsController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRegion: Region = await Region.findOrFail(params.id);
            return theRegion;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Region.query().paginate(page, perPage)
            } else {
                return await Region.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theRegion: Region = await Region.create(body);
        return theRegion;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRegion: Region = await Region.findOrFail(params.id);
        const body = request.body();
        theRegion.region_name = body.region_name;
        theRegion.capital = body.capital;
        return await theRegion.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRegion: Region = await Region.findOrFail(params.id);
        response.status(204);
        return await theRegion.delete();
    }

}