import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Headquarter from "App/Models/Headquarter";
import axios from "axios";

import Env from "@ioc:Adonis/Core/Env";
import HeadquarterValidator from "App/Validators/HeadquarterValidator";

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

    const body = await request.validate(HeadquarterValidator);
    return await Headquarter.create(body);
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
    await headquarter.load("rooms");
    if (headquarter.rooms.length > 0) {
      return response.status(400).send({
        message: "La sede tiene salas asociadas, no se puede eliminar.",
      });
    }
    response.status(204);
    return await headquarter.delete();
  }

  public async exitsCity(city: string) {
    return axios.get(
      // ? es un query parameter que se le pasa a la url
      `${Env.get("API_MAP_NATIONAL")}/?municipio=${city}`,
    ).then((res) => res.data.length === 0);
  }
}
