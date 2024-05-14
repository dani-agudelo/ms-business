import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import axios from "axios";

import Env from "@ioc:Adonis/Core/Env";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Driver from "App/Models/Driver";
import DriverValidator from "App/Validators/DriverValidator";

export default class DriversController {
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const drivers: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const theDriver: Driver = await Driver.findOrFail(params.id);
      drivers.push(theDriver);
    } else if (page && per_page) {
      const { meta, data } = await Driver.query()
        .paginate(page, per_page)
        .then((res) => res.toJSON());

      metaAux.push(meta);
      drivers.push(...data);
    } else {
      const allDrivers = await Driver.all();
      drivers.push(...allDrivers.map((c) => c.toJSON()));
    }

    await Promise.all(
      drivers.map(async (Driver: Driver, index: number) => {
        const res = await axios.get(
          `${Env.get("MS_SECURITY")}/api/users/email/${Driver.email}`,
          {
            headers: {
              Authorization: `Bearer ${Env.get("MS_SECURITY_KEY")}`,
            },
          },
        );
        const { _id, name, email } = res.data;
        drivers[index] = { id: Driver.id, user_id: _id, name, email };
      }),
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: drivers };
    }

    return drivers;
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(DriverValidator);
    const theDriver: Driver = await Driver.create(body);
    return theDriver;
  }

  public async update({ params, request }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id);
    const data = request.body();
    theDriver.merge(data);
    return await theDriver.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id);
    response.status(204);
    return await theDriver.delete();
  }
}
