import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pqr from 'App/Models/Pqr';

export default class PqrController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return await Pqr.findOrFail(params.id);
        }
        const data = request.all();

        if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);

            return await Pqr.query().paginate(page, perPage);
        }
        return await Pqr.all();
    }

    public async create({ request }: HttpContextContract) {
        const data = request.all();
        return await Pqr.create(data);
    }

    public async update({ request, params }: HttpContextContract) {
        const pqr: Pqr = await Pqr.findOrFail(params.id);
        const data = request.body();
        pqr.merge(data);
        return await pqr.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const pqr = await Pqr.findOrFail(params.id);
        response.status(204);
        return await pqr.delete();
    }
}
