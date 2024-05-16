import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Headquarter from "App/Models/Headquarter";
import HeadquarterValidator from "App/Validators/HeadquarterValidator";
import axios from "axios";

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
    const body = await request.validate(HeadquarterValidator)

    // obtengo la ciudad de la sede
    const { city } = body;

    // hago una solicitud a la API de ciudades
    const response = await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json');

    // Busca la ciudad en los datos de la respuesta
    const cityData = response.data.find((c: any) => c.municipio === city);

    // Si la ciudad no se encuentra en los datos de la respuesta, lanza un error
    if (!cityData) {
      throw new Error('Ciudad inválida');
    }

    // Crea la nueva sede con los datos de la ciudad
    const theHeadquarter: Headquarter = await Headquarter.create({
      ...body,
      city: cityData.municipio,
    });


    return theHeadquarter
  }

  public async update({ request, params }: HttpContextContract) {
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
}
