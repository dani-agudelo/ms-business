import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Headquarter from "App/Models/Headquarter";
import axios from "axios";

import Env from "@ioc:Adonis/Core/Env";

export default class HeadquartersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Headquarter.findOrFail(params.id);
    }
    const data = request.all();

    if ("page" in data && "per_page" in data) {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);

      return await Headquarter.query().paginate(page, perPage);
    }
    return await Headquarter.all();
  }

  public async create({ request }: HttpContextContract) {
    if (await this.exitsCity(request.input("city"))) {
      return { message: "The city does not exist" };
    }

    const data = request.body();
    return await Headquarter.create(data);
  }

  public async update({ request, params }: HttpContextContract) {
    if (await this.exitsCity(request.input("city"))) {
      return { message: "The city does not exist" };
    }
    const data = request.body();
    const headquarter = await Headquarter.findOrFail(params.id);
    headquarter.merge(data);
    return await headquarter.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const headquarter = await Headquarter.findOrFail(params.id);
    response.status(204);
    return await headquarter.delete();
  }

  public async exitsCity(city: string) {
    return axios.get(
      `${Env.get("API_MAP_NATIONAL")}/?c_digo_dane_del_municipio=${city}`,
    );
  }
}
