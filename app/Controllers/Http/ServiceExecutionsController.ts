import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ServiceExecution from "App/Models/ServiceExecution";
import ServiceExecutionValidator from "App/Validators/ServiceExecutionValidator";

export default class ServiceExecutionsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theServiceExecution: ServiceExecution = await ServiceExecution.findOrFail(params.id);
      await theServiceExecution.load("headquarter");
      await theServiceExecution.load("service");
      await theServiceExecution.load("room");
      return theServiceExecution;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await ServiceExecution.query().paginate(page, perPage);
      } else {
        return await ServiceExecution.query();
      }
    }
  }

  public findByCustomer({ params }: HttpContextContract) {
    return ServiceExecution.query()
      .where("customer_id", params.customer_id)
      .preload("service").preload("headquarter").preload("room");
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(ServiceExecutionValidator);
    console.log('bodyse', body)
    if (body.headquarter && body.service && body.room) {
      const newBody = {
        service_id: body.service?.id,
        customer_id: body.customer_id,
        headquarter_id: body.headquarter?.id,
        room_id: body.room?.id,
      }
      const theServiceExecution: ServiceExecution =
        await ServiceExecution.create(newBody);
      return theServiceExecution;
    }
    const theServiceExecution: ServiceExecution =
      await ServiceExecution.create(body);
    return theServiceExecution;
  }

  public async update({ params, request }: HttpContextContract) {
    const theServiceExecution: ServiceExecution =
      await ServiceExecution.findOrFail(params.id);
    const data = request.body();
    theServiceExecution.merge(data);
    return await theServiceExecution.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theServiceExecution: ServiceExecution =
      await ServiceExecution.findOrFail(params.id);
    await theServiceExecution.load('comments');
    await theServiceExecution.load('chat');

    if ((theServiceExecution.comments && theServiceExecution.comments.length > 0) || (theServiceExecution.chat)) {
      return response.status(400).send({ message: 'No se puede eliminar, el servicio en ejecucion tiene comentarios o chats asociados' });
    }
    response.status(204);
    return await theServiceExecution.delete();
  }

  public async findCode({ params }: HttpContextContract) {
    return ServiceExecution.query().where("unique_code", params.unique_code).first();
  }
}
