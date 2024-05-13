import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Beneficiary from "App/Models/Beneficiary";
import BeneficiaryValidator from "App/Validators/BeneficiaryValidator";

export default class BeneficiariesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theBeneficiaty: Beneficiary = await Beneficiary.findOrFail(params.id);
      return theBeneficiaty;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Beneficiary.query().paginate(page, perPage);
      } else {
        return await Beneficiary.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(BeneficiaryValidator);
    const theBeneficiaty: Beneficiary = await Beneficiary.create(body);
    return theBeneficiaty;
  }

  public async update({ params, request }: HttpContextContract) {
    const theBeneficiaty: Beneficiary = await Beneficiary.findOrFail(params.id);
    const data = request.body();
    theBeneficiaty.merge(data);
    return await theBeneficiaty.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theBeneficiaty: Beneficiary = await Beneficiary.findOrFail(params.id);
    response.status(204);
    return await theBeneficiaty.delete();
  }
}
