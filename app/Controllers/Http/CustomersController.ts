import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Customer from "App/Models/Customer";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import CustomerValidator from "App/Validators/CustomerValidator";
import UserService from "App/services/user_service";
import { inject } from "@adonisjs/core/build/standalone";

@inject([UserService])
export default class CustomersController {
  constructor(protected userService: UserService) {}

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
      customers.push(...allCustomers);
    }

    await Promise.all(
      customers.map(async (customer: Customer, index: number) => {
        const res = await this.userService.getUserById(customer.user_id);
        const { name, email } = res.data;
        customers[index] = { name, email, ...customer.toJSON() };
      }),
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: customers };
    }

    return customers;
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(CustomerValidator);
    const user = { name: body.name, email: body.email };
    let res: any;

    try {
      res = await this.userService.postUser(user);
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }

    const customer = {
      user_id: res.data.id,
      name: body.name,
      email: body.email,
      document: body.document,
      phone: body.phone,
    };

    const theCustomer: Customer = await Customer.create(customer);
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
