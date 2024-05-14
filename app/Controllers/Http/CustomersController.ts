import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Customer from "App/Models/Customer";

import axios from "axios";

import Env from "@ioc:Adonis/Core/Env";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import CustomerValidator from "App/Validators/CustomerValidator";

export default class CustomersController {
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const customers: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const theCustomer: Customer = await Customer.findOrFail(params.id);
      customers.push(theCustomer);
    } else if (page && per_page) {
      const { meta, data } = await Customer.query()
        .paginate(page, per_page)
        .then((res) => res.toJSON());

      metaAux.push(meta);
      customers.push(...data);
    } else {
      const allCustomers = await Customer.all();
      customers.push(...allCustomers.map((c) => c.toJSON()));
    }

    await Promise.all(
      customers.map(async (customer: Customer, index: number) => {
        const res = await axios.get(
          `${Env.get("MS_SECURITY")}/api/users/email/${customer.email}`,
          {
            headers: {
              Authorization: `Bearer ${Env.get("MS_SECURITY_KEY")}`,
            },
          },
        );
        const { _id, name, email } = res.data;
        const { id, document, phone, gender } = customer;
        customers[index] = {
          id,
          user_id: _id,
          name,
          email,
          document,
          phone,
          gender,
        };
      }),
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: customers };
    }

    return customers;
  }

  public async getChatByServiceExecution({ params }: HttpContextContract) {
    return Customer.findOrFail(params.id).then((customer) =>
      customer
        .related("serviceExecutions")
        .query()
        .where("id", params.service_execution_id)
        .first()
        .then((serviceExecution) => serviceExecution?.related("chat")),
    );
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(CustomerValidator);
    const theCustomer: Customer = await Customer.create(body);
    return theCustomer;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    const data = request.body();
    theCustomer.merge(data);
    return await theCustomer.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    response.status(204);
    return await theCustomer.delete();
  }

  // get all subscriptions by customer
  public async getSubscriptionByCustomer({ params }: HttpContextContract) {
    const theCustomer = await Customer.findOrFail(params.id);
    await theCustomer.load("subscriptions");

    return Promise.all(
      theCustomer.subscriptions.map(async (s) => {
        await s.load("customer");
        return {
          id: s.id,
          customer: s.customer_id,
          start_date: s.startDate,
          end_date: s.endDate,
          monthly_fee: s.monthlyFee,
          is_paid: s.isPaid,
        };
      }),
    );
  }
}
