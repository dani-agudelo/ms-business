import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Holder from 'App/Models/Holder';

export default class HoldersController {
  public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theHolder: Holder = await Holder.findOrFail(params.id);
            return theHolder;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Holder.query().paginate(page, perPage)
            } else {
                return await Holder.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theHolder: Holder = await Holder.create(body);
        return theHolder;
    }

    public async update({ params, request }: HttpContextContract) {
        const theHolder: Holder = await Holder.findOrFail(params.id);
        const data = request.body();
        theHolder.merge(data);
        return await theHolder.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theHolder: Holder = await Holder.findOrFail(params.id);
        response.status(204);
        return await theHolder.delete();

}
