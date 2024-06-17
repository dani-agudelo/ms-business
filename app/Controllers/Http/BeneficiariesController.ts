import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Beneficiary from "App/Models/Beneficiary";
import UserService from "App/Services/user_service";
import BeneficiaryValidator from "App/Validators/BeneficiaryValidator";

@inject([UserService])
export default class BeneficiariesController {
  constructor(protected userService: UserService) {}

  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theBeneficiaty: Beneficiary = await Beneficiary.findOrFail(params.id);
      await theBeneficiaty.load("customer");
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

  public async findByOwner({ params }: HttpContextContract) {
    const beneficiaries: Beneficiary[] = await Beneficiary.query()
      .where("owner_id", params.id)
      .preload("customer");

    return await Promise.all(
      beneficiaries.map(async (beneficiary: Beneficiary) => {
        let user = await this.userService.getUserById(
          beneficiary.customer.user_id,
        );

        return {
          name: user.data.name,
          email: user.data.email,
          ...beneficiary.toJSON(),
        };
      }),
    );
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
