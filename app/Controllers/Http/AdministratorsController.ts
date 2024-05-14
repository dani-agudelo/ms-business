import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Administrator from "App/Models/Administrator";

import axios from "axios";

import Env from "@ioc:Adonis/Core/Env";
import AdministratorValidator from "App/Validators/AdministratorValidator";

export default class AdministratorsController {
  public async find({ request, params }: HttpContextContract) {
    const administrators: ModelObject[] = [];
    const { page, per_page } = request.only(["page", "per_page"]);
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const theAdministrator: Administrator = await Administrator.findOrFail(
        params.id,
      );
      administrators.push(theAdministrator);
    } else if (page && per_page) {
      const { meta, data } = await Administrator.query()
        .paginate(page, per_page)
        .then((res) => res.toJSON());

      metaAux.push(meta);
      administrators.push(...data);
    } else {
      const allAdministrators = await Administrator.all();
      administrators.push(...allAdministrators.map((c) => c.toJSON()));
    }

    await Promise.all(
      administrators.map(
        async (Administrator: Administrator, index: number) => {
          const res = await axios.get(
            `${Env.get("MS_SECURITY")}/api/users/email/${Administrator.email}`,
            {
              headers: {
                Authorization: `Bearer ${Env.get("MS_SECURITY_KEY")}`,
              },
            },
          );
          const { _id, name, email } = res.data;
          administrators[index] = {
            id: Administrator.id,
            user_id: _id,
            name,
            email,
          };
        },
      ),
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: administrators };
    }

    return administrators;
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(AdministratorValidator);
    const theAdministrator: Administrator = await Administrator.create(body);
    return theAdministrator;
  }

  public async update({ params, request }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(
      params.id,
    );
    const data = request.body();
    theAdministrator.merge(data);
    return await theAdministrator.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(
      params.id,
    );
    response.status(204);
    return await theAdministrator.delete();
  }
}
