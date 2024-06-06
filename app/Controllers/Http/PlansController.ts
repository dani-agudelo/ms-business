import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan';
import PlanValidator from 'App/Validators/PlanValidator';

export default class PlansController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thePlan: Plan = await Plan.findOrFail(params.id);
            return thePlan;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Plan.query().paginate(page, perPage)
            } else {
                return await Plan.query()
            }

        }

    }
    
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(PlanValidator);
        const thePlan: Plan = await Plan.create(body);
        return thePlan;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePlan: Plan = await Plan.findOrFail(params.id);
        const data = request.body();
        thePlan.merge(data);
        return await thePlan.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePlan: Plan = await Plan.findOrFail(params.id);

        await thePlan.load('servicePlans');
        if (thePlan.servicePlans.length > 0) {
            response.status(400);
            return { message: 'No se puede eliminar el plan porque tiene servicios asociados' };
        }
        response.status(204);
        return await thePlan.delete();
    }
}
