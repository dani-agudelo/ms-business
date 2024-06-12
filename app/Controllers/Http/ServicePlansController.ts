import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service';
import ServicePlan from 'App/Models/ServicePlan';
import ServicePlanValidator from 'App/Validators/ServicePlanValidator';

export default class ServicePlansController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theServicePlan: ServicePlan = await ServicePlan.findOrFail(params.id);
            await theServicePlan.load("service");
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

    async findServicePlanByPlan({ params }: HttpContextContract) {
        return ServicePlan.query()
            .where("plan_id", params.plan_id)
            .preload("plan")
            .then((servicePlan: ServicePlan[]) => {
                return servicePlan.map((s) => {
                    return {
                        id: s.id,
                        plan_id: s.plan_id,
                        service_id: s.service_id,
                    };
                });
            });
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(ServicePlanValidator);
        //antes de crear el service plan asignarle el id del servicio
        const theService: Service = await Service.findOrFail(body.service?.id);
        const newBody = {
            service_id: theService?.id,
            plan_id: body.plan_id
        }
        const theServicePlan: ServicePlan = await ServicePlan.create(newBody);
        return theServicePlan;
    }

    public async update({ params, request }: HttpContextContract) {
        const theServicePlan: ServicePlan = await ServicePlan.findOrFail(params.id);
        const body = await request.validate(ServicePlanValidator);
        const theService: Service = await Service.findOrFail(body.service?.id);
        const newBody = {
            service_id: theService?.id,
            plan_id: body.plan_id
        }
        theServicePlan.merge(newBody);
        return await theServicePlan.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theServicePlan: ServicePlan = await ServicePlan.findOrFail(params.id);
        response.status(204);
        return await theServicePlan.delete();
    }

}



