import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";

export default class ServicesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Service.findOrFail(params.id);
    }
    const data = request.all();

    if ("page" in data && "per_page" in data) {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);

      return await Service.query().paginate(page, perPage);
    }
    return await Service.all();
  }

  public async create({ request }: HttpContextContract) {
    const data = request.body();
    return await Service.create(data);
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.body();
    const service = await Service.findOrFail(params.id);
    service.merge(data);
    return await service.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const service = await Service.findOrFail(params.id);
    response.status(204);
    return await service.delete();
  }
}
