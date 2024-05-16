import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Beneficiary from "App/Models/Beneficiary";
import Owner from "App/Models/Owner";
import OwnerValidator from "App/Validators/OwnerValidator";

export default class OwnersController {
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const owners: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const theOwner: Owner = await Owner.findOrFail(params.id);
      await theOwner.load("customer");
      owners.push(theOwner);
    } else if (page && per_page) {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);
      // owner query encuentra todos los registros de la tabla owner    
      const { meta, data } = await Owner.query()
        .preload("customer")
        .paginate(page, perPage)
        .then((res) => res.toJSON());
      metaAux.push(meta);
      owners.push(...data);
    } else {
      const allOwners = await Owner.query().preload("customer");
      owners.push(...allOwners.map((o) => o.toJSON()));
    }

    return owners.map((owner: Owner) => ({
      id: owner.id,
      customer_id: owner.customer.id,
      name: owner.customer.name,
      email: owner.customer.email,
      document: owner.customer.document,
      start_date: owner.start_date,
      end_date: owner.end_date,
    }));
  }

  public async getBeneficiaries({ params }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id);
    await theOwner.load("beneficiaries");

    return Promise.all(
      theOwner.beneficiaries.map(async (b) => {
        await b.load("customer");
        return {
          id: b.id,
          name: b.customer.name,
          email: b.customer.email,
          document: b.customer.document,
          age: b.age,
        };
      }),
    );
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
    const theBeneficiaries: Beneficiary[] = await theOwner
      .related("beneficiaries")
      .query();

    if (theBeneficiaries.length > 0) {
      response.status(400);
      return { message: "Owner has beneficiaries" };
    }
    response.status(204);
    return await theOwner.delete();
  }
}
