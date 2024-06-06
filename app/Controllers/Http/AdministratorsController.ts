import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Administrator from "App/Models/Administrator";
import AdministratorValidator from "App/Validators/AdministratorValidator";
import UserService from "App/services/user_service";

@inject([UserService])
export default class AdministratorsController {
  constructor(protected userService: UserService) { }

  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const administrators: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
      administrators.push(theAdministrator);
    } else if (page && per_page) {
      const { meta, data } = await Administrator.query()
        .paginate(page, per_page)
        .then((res) => res.toJSON());

      metaAux.push(meta);
      administrators.push(...data);
    } else {
      const allAdministrators = await Administrator.all();
      administrators.push(...allAdministrators);
    }

    await Promise.all(
      administrators.map(async (administrator: Administrator, index: number) => {
        const res = await this.userService.getUserById(administrator.user_id);
        const { name, email } = res.data;
        administrators[index] = {
          name,
          email,
          ...administrator.toJSON(),
        };
      }),
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: administrators };
    }

    return administrators;
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(AdministratorValidator);
    const user = { name: body.name, email: body.email };
    let res: any;

    try {
      res = await this.userService.postUser(user);
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }

    let administrator: ModelObject = { user_id: res.data._id };
    Object.keys(body).forEach(
      (key) => Administrator.$hasColumn(key) && (administrator[key] = body[key]),
    );


    const theAdministrator: Administrator = await Administrator.create(body);
    return theAdministrator;
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
    const data = request.body();

    try {
      const user = { name: data.name, email: data.email };
      await this.userService.putUser(theAdministrator.user_id, user);
    } catch (error) {
      response.status(400).send({ message: 'User not found' });
    }

    let newAdministrator: ModelObject = {};
    Object.keys(data).forEach(
      (key) => Administrator.$hasColumn(key) && (newAdministrator[key] = data[key]),
    );
    
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
