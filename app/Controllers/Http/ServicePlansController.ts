import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServicePlan from 'App/Models/ServicePlan';

export default class ServicePlansController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theServicePlan: ServicePlan = await ServicePlan.findOrFail(params.id);
            return theServicePlan;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ServicePlan.query().paginate(page, perPage)
            } else {
                return await ServicePlan.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theServicePlan: ServicePlan = await ServicePlan.create(body);
        return theServicePlan;
    }

    public async update({ params, request }: HttpContextContract) {
        const theServicePlan: ServicePlan = await ServicePlan.findOrFail(params.id);
        const data = request.body();
        theServicePlan.merge(data);
        return await theServicePlan.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theServicePlan: ServicePlan = await ServicePlan.findOrFail(params.id);
        response.status(204);
        return await theServicePlan.delete();
    }

}


