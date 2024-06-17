import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Customer from "App/Models/Customer";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import CustomerValidator from "App/Validators/CustomerValidator";
import UserService from "App/Services/user_service";
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
        console.log('customeridddd', customer.user_id)
        const res = await this.userService.getUserById(customer.user_id);
        console.log('ressss', res)
        const { name, email } = res.data;
        customers[index] = { name, email, ...customer.toJSON() };
      }),
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: customers };
    }

    return customers;
  }

  public async findWithoutOwner() {
    const customers: ModelObject[] = [];
    const allCustomers = await Customer.query().doesntHave("owners");

    await Promise.all(
      allCustomers.map(async (customer: Customer) => {
        const res = await this.userService.getUserById(customer.user_id);
        const { name, email } = res.data;
        customers.push({
          name,
          email,
          id: customer.id,
          document: customer.document,
          is_alive: customer.is_alive,
        });
      }),
    );

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

    let customer: ModelObject = { user_id: res.data._id };
    Object.keys(body).forEach(
      (key) => Customer.$hasColumn(key) && (customer[key] = body[key]),
    );

    const theCustomer: Customer = await Customer.create(customer);
    return theCustomer;
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    const body = request.body();

    try {
      const user = { name: body.name, email: body.email };
      await this.userService.putUser(theCustomer.user_id, user);
    } catch (error) {
      response.status(400).send({ message: "User not found" });
    }

    let newCustomer: ModelObject = {};
    Object.keys(body).forEach(
      (key) => Customer.$hasColumn(key) && (newCustomer[key] = body[key]),
    );

    theCustomer.merge(newCustomer);
    return await theCustomer.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    const keys: string[] = [
      "owners",
      "beneficiaries",
      "serviceExecutions",
      "subscriptions",
    ];

    const hasDependencies = await Promise.all(
      keys.map(async (key: any) => {
        await theCustomer.load(key);
        return theCustomer[key].length > 0;
      }),
    );

    if (hasDependencies.some((d) => d)) {
      return response.status(400).send({
        message: "Customer has dependencies, cannot be deleted",
      });
    }

    await this.userService.deleteUser(theCustomer.user_id);
    await theCustomer.delete();
    return response.status(204);
  }
}
