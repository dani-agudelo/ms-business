import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Owner from "App/Models/Owner";
import OwnerValidator from "App/Validators/OwnerValidator";

export default class OwnersController {
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const owners: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const theOwner: Owner = await Owner.findOrFail(params.id);
      await theOwner.load("beneficiaries");
      await theOwner.load("customer");
      owners.push(theOwner);
    } else if (page && per_page) {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);
      const { meta, data } = await Owner.query()
        .preload("beneficiaries")
        .preload("customer")
        .paginate(page, perPage)
        .then((res) => res.toJSON());
      metaAux.push(meta);
      owners.push(...data);
    } else {
      const allOwners = await Owner.query()
        .preload("beneficiaries")
        .preload("customer");
      owners.push(...allOwners.map((o) => o.toJSON()));
    }

    return owners.map((owner: Owner) => ({
      id: owner.id,
      name: owner.customer.name,
      email: owner.customer.email,
      document: owner.customer.document,
      start_date: owner.start_date,
      end_date: owner.end_date,
      beneficiaries: owner.beneficiaries,
    }));
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(OwnerValidator);
    const theOwner: Owner = await Owner.create(body);
    return theOwner;
  }

  public async update({ params, request }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id);
    const data = request.body();
    theOwner.merge(data);
    return await theOwner.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id);
    response.status(204);
    return await theOwner.delete();
  }
}
