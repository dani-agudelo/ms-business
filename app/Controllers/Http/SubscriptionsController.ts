import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Plan from "App/Models/Plan";

import Subscription from "App/Models/Subscription";
import SubscriptionValidator from "App/Validators/SubscriptionValidator";

export default class SubscriptionsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theSubscription: Subscription = await Subscription.findOrFail(params.id);
      await theSubscription.load("customer");
      await theSubscription.load("plan");
      return theSubscription;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Subscription.query().paginate(page, perPage);
      } else {
        return await Subscription.query();
      }
    }
  }

  async findSubscriptionByCustomer({ params }: HttpContextContract) {
    return Subscription.query()
      .where("customer_id", params.customer_id)
      .preload("customer")
      .then((subs: Subscription[]) => {
        return subs.map((s) => {
          return {
            id: s.id,
            customer_id: s.customer_id,
            reference: s.reference,
            status: s.status,
            start_date: s.startDate,
            end_date: s.endDate,
            monthly_fee: s.monthlyFee,
          };
        });
      });
  }

  async findSubscriptionByPlan({ params }: HttpContextContract) {
    return Subscription.query()
      .where("plan_id", params.plan_id)
      .preload("plan")
      .then((subs: Subscription[]) => {
        return subs.map((s) => {
          return {
            id: s.id,
            customer_id: s.customer_id,
            reference: s.reference,
            status: s.status,
            start_date: s.startDate,
            end_date: s.endDate,
            monthly_fee: s.monthlyFee,
            plan_id: s.plan_id,
          };
        });
      });
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(SubscriptionValidator);
    console.log(body);
    const thePlan: Plan = await Plan.findOrFail(body.plan?.id);

    if (body.plan) {
      const newBody = {
        plan_id: thePlan?.id,
        customer_id: body.customer?.id,
        start_date: body.start_date,
        end_date: body.end_date,
        status: body.status,
        monthly_fee: body.monthly_fee,
      };
      const theSubscription: Subscription = await Subscription.create(newBody);
      return theSubscription;
    } else if (body.customer) {
      const newBody = {
        customer_id: body.customer.id,
        start_date: body.start_date,
        end_date: body.end_date,
        monthly_fee: body.monthly_fee,
        status: body.status,
        plan_id: thePlan?.id,
      };
      const theSubscription: Subscription = await Subscription.create(newBody);
      return theSubscription;
    } else {
      const theSubscription: Subscription = await Subscription.create(body);
      return theSubscription;
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const theSubscription: Subscription = await Subscription.findOrFail(
      params.id,
    );
    const data = request.body();
    theSubscription.merge(data);
    return await theSubscription.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theSubscription: Subscription = await Subscription.findOrFail(
      params.id,
    );
    // Carga la relación de pagos
    await theSubscription.load("payments");

    // Verifica si la suscripción tiene pagos
    if (theSubscription.payments && theSubscription.payments.length > 0) {
      return response
        .status(400)
        .send({
          message: "No se puede eliminar una suscripción que tiene pagos.",
        });
    }
    response.status(204);
    return await theSubscription.delete();
  }

  public async getPaymentsBySubscription({ params }: HttpContextContract) {
    const theSubscription = await Subscription.findOrFail(params.id);
    await theSubscription.load("payments");

    return Promise.all(
      theSubscription.payments.map(async (p) => {
        return {
          id: p.id,
          subscription_id: p.subscription,
          amount: p.amount,
          payment_date: p.paymentDate,
          payment_method: p.paymentMethod,
        };
      }),
    );
  }
}
